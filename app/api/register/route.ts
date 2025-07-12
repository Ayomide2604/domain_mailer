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
	console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

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
		return NextResponse.json({ error: "User Already exists" }, { status: 400 });
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

			const emailResult = await sendEmail({
				from: "Admin <admin@chicagocrane.services>",
				to: createdUser.email as string,
				subject: "Welcome to Domain Mailer!",
				EmailComponent: WelcomeEmail,
				name: createdUser.name as string,
			});

			if (emailResult.error) {
				throw new Error("Failed to send welcome email: " + emailResult.error.message);
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
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error.message || "Registration failed.",
				error,
			},
			{ status: 500 }
		);
	}
}
