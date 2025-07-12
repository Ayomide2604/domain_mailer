import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/boxicons.css";
import "./css/style.css";
import BootstrapClient from "./BootstrapClient";
import Header from "./Header";
import BackToTop from "./components/BackToTop";

export const metadata: Metadata = {
	title: "Domain Mailer",
	description: "Domain Mailer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={``}>
				<BootstrapClient />
				<Header />
				{children}
				<BackToTop />
			</body>
		</html>
	);
}
