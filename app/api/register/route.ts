import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/app/utils/sendEmail";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

const schema = z.object({
	name: z.string().min(3),
	email: z.string(),
	password: z.string().min(5),
});
export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.issues, { status: 400 });

	const { name, email, password } = validation.data;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user)
		return NextResponse.json(
			{ message: "User Already exists" },
			{ status: 400 }
		);
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = await prisma.$transaction(async (tx) => {
			const createdUser = await tx.user.create({
				data: {
					name,
					email,
					hashedPassword,
				},
			});

			// Generate verification token
			const crypto = await import("crypto");
			const { addMinutes } = await import("date-fns");
			const token = crypto.randomBytes(32).toString("hex");

			await tx.verificationToken.create({
				data: {
					identifier: email,
					token,
					expires: addMinutes(new Date(), 30), // valid for 30 mins
				},
			});

			// Construct verification URL
			const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

			const emailResult = await sendEmail({
				from: "Admin <admin@chicagocrane.services>",
				to: createdUser.email as string,
				subject: "Confirm your email",
				EmailComponent: WelcomeEmail,
				name: createdUser.name as string,
				verifyUrl, // pass it to the email component
			});

			if (emailResult.error) {
				throw new Error(
					"Failed to send verification email: " + emailResult.error
				);
			}

			return createdUser;
		});

		return NextResponse.json(
			{
				message: "user created successfully",
				newUser: {
					name: newUser.name,
					email: newUser.email,
				},
			},
			{ status: 201 }
		);
	} catch (error: Error | unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ error }, { status: 500 });
		}
	}
}
