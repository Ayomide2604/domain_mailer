"use client";
import React from "react";
import Image from "next/image";
import defaultProfile from "../images/default_profile.svg";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
	name: string;
	email: string;
}

const Header = () => {
	const { data: session } = useSession();
	const user = session?.user as User;
	const router = useRouter();

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		await signOut({ redirect: false });
		router.push("/login");
		toast.success("Logout successfully");
	};

	return (
		<header className="header navbar navbar-expand-lg bg-light navbar-sticky">
			<div className="container px-3">
				<Link href="/" className="navbar-brand pe-3">
					Mailer
				</Link>

				<div id="navbarNav" className="offcanvas offcanvas-end">
					<div className="offcanvas-header border-bottom">
						<h5 className="offcanvas-title">Menu</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>

					<div className="offcanvas-body">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link href="/" className="nav-link">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/" className="nav-link">
									About
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/" className="nav-link">
									Pricing
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/contact" className="nav-link">
									Contact
								</Link>
							</li>

							{user && (
								<li className="nav-item dropdown d-lg-none mt-3">
									<a
										href="#"
										className="d-flex align-items-center"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<Image
											className="img-fluid bg-white"
											src={defaultProfile}
											alt="profile"
											style={{ height: 30, width: 30, borderRadius: 20 }}
										/>
										<i className="bi bi-chevron-down ms-1" />
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link className="dropdown-item" href="#">
												Dashboard
											</Link>
										</li>
										<li>
											<Link className="dropdown-item" href="#">
												Settings
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<Link
												className="dropdown-item"
												href="#"
												onClick={handleLogout}
											>
												Logout
											</Link>
										</li>
									</ul>
								</li>
							)}
						</ul>
					</div>

					{user ? null : (
						<div className="offcanvas-header border-top">
							<Link href="/register" className="btn btn-primary w-100">
								&nbsp;Get Started
							</Link>
						</div>
					)}
				</div>

				<ThemeToggleButton />

				<button
					type="button"
					className="navbar-toggler"
					data-bs-toggle="offcanvas"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{user ? (
					<div className="dropdown d-none d-lg-inline-flex">
						<Link
							href="#"
							className="d-flex align-items-center"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<Image
								className="img-fluid bg-white"
								src={defaultProfile}
								alt="profile"
								style={{ height: 30, width: 30, borderRadius: 20 }}
							/>
							<i className="bi bi-chevron-down ms-1" />
						</Link>
						<ul className="dropdown-menu dropdown-menu-end">
							<li>
								<Link className="dropdown-item" href="#">
									Dashboard
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Settings
								</Link>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<Link className="dropdown-item" href="#" onClick={handleLogout}>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				) : (
					<Link
						href="/register"
						className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
					>
						&nbsp;Get Started
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
