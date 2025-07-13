"use client";

import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";

function SlidingPreviewPane({
	recipients,
	removeRecipient,
	fromEmail,
	subject,
	body,
	onClose,
	previewTab,
}: {
	recipients: string[];
	removeRecipient: (email: string) => void;
	fromEmail: string;
	subject: string;
	body: string;
	onClose: () => void;
	previewTab: "preview" | "recipients";
}) {
	useEffect(() => {
		setTab(previewTab);
	}, [previewTab]);
	const [tab, setTab] = useState<"preview" | "recipients">(previewTab);
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				height: "100vh",
				width: "400px",
				background: "#fff",
				boxShadow: "-2px 0 16px rgba(0,0,0,0.12)",
				zIndex: 1050,
				transform: "translateX(0)",
				transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
				display: "flex",
				flexDirection: "column",
			}}
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
	);
}

export default function EmailPage() {
	const [previewTab, setPreviewTab] = useState<"preview" | "recipients">(
		"preview"
	);
	const csvInputRef = useRef<HTMLInputElement>(null);
	
	
	const [subject, setSubject] = useState("");
const [sending, setSending] = useState(false);
const [sendProgress, setSendProgress] = useState(0);
const [sendTotal, setSendTotal] = useState(0);
const [sendDone, setSendDone] = useState(false);
	const [body, setBody] = useState("");
	const [fromEmail, setFromEmail] = useState("");
	
	const [recipients, setRecipients] = useState<string[]>([]);
	const [recipientInput, setRecipientInput] = useState("");
	const [showPreview, setShowPreview] = useState(true);

	const validateEmail = (email: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

	const addRecipients = (input: string) => {
		const split = input
			.split(/[\n,;\s]+/)
			.map((e) => e.trim())
			.filter((e) => e.length > 0 && validateEmail(e));
		setRecipients((prev) => Array.from(new Set([...prev, ...split])));
	};

	const handleRecipientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientInput(e.target.value);
	};

	const handleRecipientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (["Enter", ",", ";", " "].includes(e.key)) {
			e.preventDefault();
			if (validateEmail(recipientInput)) {
				addRecipients(recipientInput);
				setRecipientInput("");
				setShowPreview(true); // Open preview pane if closed
				setPreviewTab("recipients"); // Show recipients tab
			}
		}
	};

	const handleRecipientPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const text = e.clipboardData.getData("text");
		addRecipients(text);
		setRecipientInput("");
	};

	const removeRecipient = (email: string) => {
		setRecipients((prev) => prev.filter((r) => r !== email));
	};

	const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const text = evt.target?.result as string;
			addRecipients(text);
		};
		reader.readAsText(file);
	};

	const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleCSV(e);
		setShowPreview(true); // Open preview pane
		setPreviewTab("recipients"); // Show recipients tab
		// Reset the file input so the same file can be uploaded again if needed
		if (csvInputRef.current) csvInputRef.current.value = "";
	};

	const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!fromEmail || recipients.length === 0 || !subject || !body) {
    alert("Please fill all fields and add at least one recipient.");
    return;
  }
  setSending(true);
  setSendProgress(0);
  setSendTotal(recipients.length);
  setSendDone(false);

  for (let i = 0; i < recipients.length; i++) {
    setSendProgress(i + 1);
    try {
      await fetch("/api/emails/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: recipients[i],
          subject,
          html: body,
        }),
      });
    } catch (err) {
      // Optionally handle error for individual emails here
    }
  }

  setSending(false);
  setSendDone(true);

  // Clear form after a short delay
  setTimeout(() => {
    setFromEmail("");
    setRecipients([]);
    setSubject("");
    setBody("");
    setRecipientInput("");
    setSendDone(false);
    setSendProgress(0);
    setSendTotal(0);
  }, 2000);
};

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

return (
		<div
			className="d-flex vh-100 bg-light text-dark"
			style={{ fontFamily: "Manrope, sans-serif" }}
		>
			{/* Main content */}
			<main
				className="flex-grow-1 p-4 d-flex flex-column bg-white w-100"
				style={{
					borderTopRightRadius: "16px",
					borderBottomRightRadius: "16px",
				}}
			>
				<h4 className="mb-4 fw-bold">Create Campaign</h4>
				{/* Toggle for showing/hiding the preview pane */}
				<div className="d-flex justify-content-end align-items-center mb-2">
					<div className="form-check form-switch">
						<input
							className="form-check-input"
							type="checkbox"
							checked={showPreview}
							onChange={() => setShowPreview((v) => !v)}
							id="previewPaneToggle"
						/>
						<label
							className="form-check-label ms-2"
							htmlFor="previewPaneToggle"
						>
							{showPreview ? "Hide" : "Show"} Preview Pane
						</label>
					</div>
				</div>

				<div className="mb-3">
					<label htmlFor="fromEmail" className="form-label">From</label>
					<input
						type="email"
						id="fromEmail"
						className="form-control"
						value={fromEmail}
						onChange={(e) => setFromEmail(e.target.value)}
						placeholder="From email"
						autoComplete="off"
					/>
				</div>

				{showPreview && (
					<SlidingPreviewPane
						recipients={recipients}
						removeRecipient={removeRecipient}
						fromEmail={fromEmail}
						subject={subject}
						body={body}
						onClose={() => setShowPreview(false)}
						previewTab={previewTab}
					/>
				)}

				<form className="card" onSubmit={handleSend}>
					<div className="card-header bg-body-tertiary">
						<h5 className="mb-0">New message</h5>
					</div>
					<div className="card-body p-0">
						<div className="border border-top-0 border-200">
							<div
								style={{
									position: "relative",
									display: "flex",
									alignItems: "center",
								}}
							>
								<input
									className="form-control border-0 rounded-0 outline-none px-x1"
									id="email-to"
									placeholder="To"
									value={recipientInput}
									onChange={handleRecipientInput}
									onKeyDown={handleRecipientKeyDown}
									onPaste={handleRecipientPaste}
									
									autoComplete="off"
									style={{ flex: 1 }}
								/>
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm ms-2"
									title="Upload CSV"
									onClick={() => csvInputRef.current?.click()}
									style={{
										position: "absolute",
										right: 8,
										top: "50%",
										transform: "translateY(-50%)",
									}}
								>
									<i className="bi bi-upload" />
								</button>
								<input
									type="file"
									accept=".csv"
									ref={csvInputRef}
									style={{ display: "none" }}
									onChange={handleCsvUpload}
								/>
							</div>
						</div>
						<div className="border border-y-0 border-200">
							<input
								className="form-control border-0 rounded-0 outline-none px-x1"
								id="email-subject"
								type="text"
								aria-describedby="email-subject"
								placeholder="Subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
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
								onChange={(e) => setBody(e.target.value)}
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
			</main>
		</div>
	);
}
