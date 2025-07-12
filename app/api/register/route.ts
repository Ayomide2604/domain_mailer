import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

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
		return NextResponse.json({ error: "User Already exists" }, { status: 400 });
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
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
}
