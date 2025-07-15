import React, { useEffect, useState } from "react";

interface SlidingPreviewPaneProps {
  recipients: string[];
  removeRecipient: (email: string) => void;
  fromEmail: string;
  subject: string;
  body: string;
  onClose: () => void;
  previewTab: "preview" | "recipients";
}

const SlidingPreviewPane: React.FC<SlidingPreviewPaneProps> = ({
  recipients,
  removeRecipient,
  fromEmail,
  subject,
  body,
  onClose,
  previewTab,
}) => {
  const [tab, setTab] = useState<"preview" | "recipients">("preview");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTab(previewTab);
  }, [previewTab]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent click bubbling from pane to backdrop
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      {isMobile && (
        <div
          className="sliding-pane-backdrop"
          onClick={onClose}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.18)", zIndex: 1049 }}
        />
      )}
      <div
        className="sliding-pane"
        onClick={isMobile ? stopPropagation : undefined}
        style={isMobile ? {zIndex: 1050} : {}}
      >
      <div className="d-flex align-items-center justify-content-between border-bottom px-4 py-3 bg-body-tertiary">
        <div>
          <button
            className={`btn btn-link px-2 py-1 ${tab === "preview" ? "fw-bold text-primary" : ""}`}
            style={{ textDecoration: "none" }}
            onClick={() => setTab("preview")}
          >
            Email Preview
          </button>
          <button
            className={`btn btn-link px-2 py-1 ${tab === "recipients" ? "fw-bold text-primary" : ""}`}
            style={{ textDecoration: "none" }}
            onClick={() => setTab("recipients")}
          >
            Recipients
          </button>
        </div>
        <button
          className="btn btn-sm btn-tertiary"
          onClick={onClose}
          title="Close"
        >
          ✖️
        </button>
      </div>
      <div className="flex-grow-1 overflow-auto p-4">
        {tab === "preview" ? (
          <div>
            <div className="mb-2">
              <span className="fw-bold">From:</span>{" "}
              {fromEmail || <span className="text-muted">(not set)</span>}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Subject:</span>{" "}
              {subject || <span className="text-muted">(no subject)</span>}
            </div>
            <hr />
            <div style={{ whiteSpace: "pre-wrap", minHeight: 120 }}>
              {body || <span className="text-muted">(no body)</span>}
            </div>
          </div>
        ) : (
          <div>
            <h6 className="fw-semibold mb-3">Recipients List</h6>
            {recipients.length === 0 ? (
              <div className="text-muted">No recipients.</div>
            ) : (
              <ul className="list-group">
                {recipients.map((email) => (
                  <li
                    key={email}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{email}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeRecipient(email)}
                      title="Remove"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SlidingPreviewPane;
