import React from "react";

interface EmailFormProps {
  subject: string;
  onSubjectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  body: string;
  onBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  children?: React.ReactNode;
}

const EmailForm: React.FC<EmailFormProps> = ({
  subject,
  onSubjectChange,
  body,
  onBodyChange,
  onSubmit,
  children,
}) => (
  <form className="card" onSubmit={onSubmit}>
    <div className="card-header bg-body-tertiary">
      <h5 className="mb-0">New message</h5>
    </div>
    <div className="card-body p-0">
      {children}
      <div className="border border-y-0 border-200">
        <input
          className="form-control border-0 rounded-0 outline-none px-x1"
          id="email-subject"
          type="text"
          aria-describedby="email-subject"
          placeholder="Subject"
          value={subject}
          onChange={onSubjectChange}
          required
        />
      </div>
      <div className="min-vh-50 email-compose-textarea">
        <textarea
          className="form-control border-0 rounded-0 outline-none px-x1"
          name="content"
          id="email-body"
          placeholder="Write your message..."
          style={{ minHeight: "30vh" }}
          value={body}
          onChange={onBodyChange}
          required
        />
      </div>
      <div className="bg-body-tertiary px-x1 py-3">
        <div className="d-inline-flex flex-column"></div>
      </div>
    </div>
    <div className="card-footer border-top border-200 d-flex flex-between-center">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-primary btn-sm px-5 me-2"
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  </form>
);

export default EmailForm;
