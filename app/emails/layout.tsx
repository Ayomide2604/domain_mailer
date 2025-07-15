"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function EmailsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (isMobile && sidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isMobile, sidebarOpen]);

	return (
		<div className="d-flex" style={{ minHeight: "100vh" }}>
			<Sidebar
				open={isMobile ? sidebarOpen : true}
				onClose={() => setSidebarOpen(false)}
			/>
			{isMobile && !sidebarOpen && (
				<button
					className="fab-open-sidebar"
					onClick={() => setSidebarOpen(true)}
					aria-label="Open sidebar"
					style={{
						position: "fixed",
						top: 16,
						left: 16,
						zIndex: 1300,
						background: "#6366f1",
						color: "#fff",
						border: "none",
						borderRadius: "50%",
						width: 48,
						height: 48,
						boxShadow: "0 4px 16px rgba(99,102,241,0.18)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 24,
					}}
				>
					<span>&#9776;</span>
				</button>
			)}
			<main
				className="flex-grow-1 bg-white"
				style={{ minHeight: "100vh" }}
				aria-hidden={isMobile && sidebarOpen}
			>
				{children}
			</main>
		</div>
	);
}
