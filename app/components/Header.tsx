"use client";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import defaultProfile from "../images/default_profile.svg";
import ThemeToggleButton from "./ThemeToggleButton";
import { useLogout } from "../hooks/useLogout";
import Loader from "./Loader";

interface User {
	name: string;
	email: string;
}

const Header = () => {
	const { logout, loading } = useLogout();
	const { data: session } = useSession();
	const user = session?.user as User;
	const offcanvasRef = useRef<HTMLDivElement>(null);

	if (loading) {
		return <Loader />;
	}

	return (
		<header className="header navbar navbar-expand-lg bg-light navbar-sticky">
			<div className="container px-3">
				<Link href="/" className="navbar-brand pe-3">
					Mailer
				</Link>

				<div
					ref={offcanvasRef}
					id="navbarNav"
					className="offcanvas offcanvas-end"
				>
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
							<li className="nav-item" data-bs-dismiss="offcanvas">
								<Link href="/" className="nav-link">
									Home
								</Link>
							</li>
							<li className="nav-item" data-bs-dismiss="offcanvas">
								<Link href="/" className="nav-link">
									About
								</Link>
							</li>
							<li className="nav-item" data-bs-dismiss="offcanvas">
								<Link href="/" className="nav-link">
									Pricing
								</Link>
							</li>
							<li className="nav-item" data-bs-dismiss="offcanvas">
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
										<li data-bs-dismiss="offcanvas">
											<Link className="dropdown-item" href="/account">
												Dashboard
											</Link>
										</li>
										<li data-bs-dismiss="offcanvas">
											<Link className="dropdown-item" href="#">
												Settings
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li data-bs-dismiss="offcanvas">
											<Link className="dropdown-item" href="#" onClick={logout}>
												Logout
											</Link>
										</li>
									</ul>
								</li>
							)}
						</ul>
					</div>

					{user ? null : (
						<div
							className="offcanvas-header border-top"
							data-bs-dismiss="offcanvas"
						>
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
								<Link className="dropdown-item" href="/account">
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
								<Link className="dropdown-item" href="#" onClick={logout}>
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
