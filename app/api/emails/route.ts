import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, from } = await req.json();

    if (!to || !subject || !html || !from) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Support both string and array for 'to'
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
