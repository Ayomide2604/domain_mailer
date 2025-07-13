import * as React from "react";

interface OutboundEmailProps {
  subject: string;
  from: string;
  to: string | string[];
  body: string;
}

export default function OutboundEmail({ subject, from, to, body }: OutboundEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f9f9f9', padding: 24 }}>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: '#fff', borderRadius: 8, maxWidth: 600, margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <tbody>
          <tr>
            <td style={{ padding: '24px 32px 16px 32px', borderBottom: '1px solid #eee' }}>
              <h2 style={{ margin: 0, fontSize: 22, color: '#222' }}>{subject}</h2>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '16px 32px' }}>
              <div style={{ color: '#333', fontSize: 16, lineHeight: 1.6 }}>
                {/* Body supports HTML, so render as dangerouslySetInnerHTML */}
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '16px 32px', color: '#888', fontSize: 13, borderTop: '1px solid #eee' }}>
              <div>From: {from}</div>
              <div>To: {Array.isArray(to) ? to.join(', ') : to}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
