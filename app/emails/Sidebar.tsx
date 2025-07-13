"use client";
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
	return (
		<aside
			className="d-flex flex-column bg-body-tertiary p-3 h-100"
			style={{ minWidth: 220, borderRight: "1px solid #eee" }}
		>
			<h5 className="mb-4 fw-bold">
				<Link href="/" className="nav-link">
					Mailer
				</Link>
			</h5>
			<nav className="nav flex-column gap-2">
				<Link href="/emails" className="nav-link">
					Compose
				</Link>
				<Link href="/emails/inbox" className="nav-link">
					Inbox
				</Link>
				<Link href="/emails/sent" className="nav-link">
					Sent
				</Link>
				<Link href="/emails/drafts" className="nav-link">
					Drafts
				</Link>
				{/* Add more links as needed */}
			</nav>
		</aside>
	);
};

export default Sidebar;
