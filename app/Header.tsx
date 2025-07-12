import React from "react";
import Image from "next/image";
import defaultProfile from "./images/default_profile.svg";

const Header = () => {
	const user = {
		isLoggedIn: true,
	};
	return (
		<header className="header navbar navbar-expand-lg bg-light navbar-sticky">
			<div className="container px-3">
				<a href="/" className="navbar-brand pe-3">
					Mailer
				</a>

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
								<a href="docs/getting-started.html" className="nav-link">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a href="docs/getting-started.html" className="nav-link">
									About
								</a>
							</li>
							<li className="nav-item">
								<a href="docs/getting-started.html" className="nav-link">
									Pricing
								</a>
							</li>
							<li className="nav-item">
								<a href="docs/getting-started.html" className="nav-link">
									Contact
								</a>
							</li>

							{user?.isLoggedIn && (
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
											<a className="dropdown-item" href="#">
												Dashboard
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Settings
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Logout
											</a>
										</li>
									</ul>
								</li>
							)}
						</ul>
					</div>

					{user?.isLoggedIn ? null : (
						<div className="offcanvas-header border-top">
							<a href="/register" className="btn btn-primary w-100">
								&nbsp;Get Started
							</a>
						</div>
					)}
				</div>

				{/* <ThemeToggleButton /> */}

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

				{user?.isLoggedIn ? (
					<div className="dropdown d-none d-lg-inline-flex">
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
						<ul className="dropdown-menu dropdown-menu-end">
							<li>
								<a className="dropdown-item" href="#">
									Dashboard
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Settings
								</a>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Logout
								</a>
							</li>
						</ul>
					</div>
				) : (
					<a
						href="/register"
						className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
					>
						&nbsp;Get Started
					</a>
				)}
			</div>
		</header>
	);
};

export default Header;
