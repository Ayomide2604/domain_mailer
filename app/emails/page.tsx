"use client";

import React, { useState, useRef } from "react";
import "../css/style.css";
import SlidingPreviewPane from "./SlidingPreviewPane";
import RecipientInput from "./RecipientInput";
import EmailForm from "./EmailForm";
import SendingStatus from "./SendingStatus";

function EmailPage() {
	const [previewTab, setPreviewTab] = useState<"preview" | "recipients">(
		"preview"
	);
	const csvInputRef = useRef<HTMLInputElement>(null);
	const [subject, setSubject] = useState("");
	const [replyTo, setReplyTo] = useState("");
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
	const handleRecipientInput = (e: React.ChangeEvent<HTMLInputElement>) =>
		setRecipientInput(e.target.value);
	const handleRecipientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (["Enter", ",", ";", " "].includes(e.key)) {
			e.preventDefault();
			if (validateEmail(recipientInput)) {
				addRecipients(recipientInput);
				setRecipientInput("");
				setShowPreview(true);
				setPreviewTab("recipients");
			}
		}
	};
	const handleRecipientPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const text = e.clipboardData.getData("text");
		addRecipients(text);
		setRecipientInput("");
	};
	const removeRecipient = (email: string) =>
		setRecipients((prev) => prev.filter((r) => r !== email));
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
		setShowPreview(true);
		setPreviewTab("recipients");
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
						replyTo,
					}),
				});
			} catch {}
		}
		setSending(false);
		setSendDone(true);
		setTimeout(() => {
			setFromEmail("");
			setRecipients([]);
			setSubject("");
			setBody("");
			setReplyTo("");
			setRecipientInput("");
			setSendDone(false);
			setSendProgress(0);
			setSendTotal(0);
		}, 2000);
	};

	if (sending || sendDone) {
		return (
			<SendingStatus
				sending={sending}
				sendProgress={sendProgress}
				sendTotal={sendTotal}
				sendDone={sendDone}
			/>
		);
	}

	return (
		<div className="main-layout bg-light text-dark">
			<main className="main-content bg-white">
				<h4 className="mb-4 fw-bold">Create Campaign</h4>
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
					<label htmlFor="fromEmail" className="form-label">
						From
					</label>
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
				<div className="mb-3">
					<label htmlFor="replyTo" className="form-label">
						Reply-To (optional)
					</label>
					<input
						type="email"
						id="replyTo"
						className="form-control"
						value={replyTo}
						onChange={(e) => setReplyTo(e.target.value)}
						placeholder="Reply-To email (optional)"
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

				<EmailForm
					subject={subject}
					onSubjectChange={(e) => setSubject(e.target.value)}
					body={body}
					onBodyChange={(e) => setBody(e.target.value)}
					onSubmit={handleSend}
				>
					<RecipientInput
						recipientInput={recipientInput}
						onInputChange={handleRecipientInput}
						onKeyDown={handleRecipientKeyDown}
						onPaste={handleRecipientPaste}
						onCsvUpload={handleCsvUpload}
						csvInputRef={csvInputRef}
					/>
				</EmailForm>
			</main>
		</div>
	);
}

export default EmailPage;
