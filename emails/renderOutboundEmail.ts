import * as React from "react";
import ReactDOMServer from "react-dom/server";
import OutboundEmail from "./OutboundEmail";

interface OutboundEmailProps {
  subject: string;
  from: string;
  to: string | string[];
  body: string;
}

export function renderOutboundEmail(props: OutboundEmailProps): string {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(OutboundEmail, props)
  );
}
