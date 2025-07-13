import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, from, replyTo } = await req.json();

    if (!to || !subject || !html || !from) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Dynamically import React, ReactDOMServer, and OutboundEmail only on the server
    const React = (await import("react"));
    const ReactDOMServer = (await import("react-dom/server"));
    const { default: OutboundEmail } = await import("../../../emails/OutboundEmail");

    // Render the email body using the OutboundEmail template
    const templatedHtml = ReactDOMServer.renderToStaticMarkup(
      React.createElement(OutboundEmail, {
        subject,
        from,
        to,
        body: html,
      })
    );

    const data = await resend.emails.send({
      from,
      to,
      subject,
      html: templatedHtml,
      replyTo: replyTo || undefined,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    let message = "Unknown error";
    function hasMessage(e: unknown): e is { message: string } {
      return (
        typeof e === "object" &&
        e !== null &&
        "message" in e &&
        typeof (e as { message: unknown }).message === "string"
      );
    }
    if (hasMessage(error)) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
