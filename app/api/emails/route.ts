import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, from } = await req.json();

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
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
