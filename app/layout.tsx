import type { Metadata } from "next";
import { Toaster } from "sonner";

// styles
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./css/boxicons.css";
import "./css/style.css";
// components
import BootstrapClient from "./utils/BootstrapClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AuthProvider from "./Provider";

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
				<AuthProvider>
					<Toaster position="top-right" richColors duration={1500} />
					<BootstrapClient />
					<Header />
					{children}
					<Footer />
					<BackToTop />
				</AuthProvider>
			</body>
		</html>
	);
}
