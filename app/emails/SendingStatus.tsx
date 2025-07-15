import React from "react";

interface SendingStatusProps {
  sending: boolean;
  sendProgress: number;
  sendTotal: number;
  sendDone: boolean;
}

const SendingStatus: React.FC<SendingStatusProps> = ({
  sending,
  sendProgress,
  sendTotal,
  sendDone,
}) => {
  if (sending) {
    return (
      <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", fontSize: 24
      }}>
        <div className="spinner-border" role="status" style={{ width: 60, height: 60 }} />
        <div style={{ marginTop: 24 }}>
          Sending email {sendProgress}/{sendTotal}
        </div>
      </div>
    );
  }
  if (sendDone) {
    return (
      <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center"
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", background: "#4BB543",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#4BB543" />
            <polyline points="14,26 22,34 34,18" fill="none" stroke="#fff" strokeWidth="4" />
          </svg>
        </div>
        <div style={{ marginTop: 24, fontSize: 24, color: "#4BB543" }}>
          All emails sent!
        </div>
      </div>
    );
  }
  return null;
};

export default SendingStatus;
