import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const email = req.nextUrl.searchParams.get("email");

  if (!token || !email)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  });

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ message: "Token expired or invalid" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token } },
  });

  return NextResponse.json({ message: "Email verified" });
}
