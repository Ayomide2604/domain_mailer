"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
	const router = useRouter();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const data = {
			name: `${firstName} ${lastName}`,
			email,
			password,
		};
		try {
			const response = await axios.post("/api/register", data);
			if (response.status === 201) {
				router.push("/login");
			}
		} catch (error) {
			console.error(error);
			alert("Failed to register");
		}
	};
	return (
		<section className="position-relative h-100">
			<div className="container d-flex flex-wrap justify-content-center justify-content-xl-start h-100">
				<div
					className="w-100 align-self-end pt-1 pt-md-4 pb-4"
					style={{ maxWidth: "526px" }}
				>
					<Link href="/">
						{/* <img
                    src={logo}
                    alt="logo"
                    className="mb-4 img-fluid"
                    style={{ maxWidth: 50 }}
                /> */}
					</Link>
					<h1 className="text-center text-xl-start">Create Account</h1>
					<p className="text-center text-xl-start pb-3 mb-3">
						Already have an account? <Link href="/login">Sign in here.</Link>
					</p>
					<form className="needs-validation" onSubmit={handleRegister}>
						<div className="row">
							<div className="col-sm-6">
								<div className="position-relative mb-4">
									<label htmlFor="firstName" className="form-label fs-base">
										First name
									</label>
									<input
										type="text"
										id="firstName"
										className="form-control form-control-lg"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
									/>
									<div className="invalid-feedback position-absolute start-0 top-100">
										Please enter your name!
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="position-relative mb-4">
									<label htmlFor="lastName" className="form-label fs-base">
										Last name
									</label>
									<input
										type="text"
										id="lastName"
										className="form-control form-control-lg"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
									/>
									<div className="invalid-feedback position-absolute start-0 top-100">
										Please enter your name!
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="position-relative mb-4">
									<label htmlFor="email" className="form-label fs-base">
										Email
									</label>
									<input
										type="email"
										id="email"
										className="form-control form-control-lg"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
									<div className="invalid-feedback position-absolute start-0 top-100">
										Please enter a valid email address!
									</div>
								</div>
							</div>
							<div className="col-12 mb-4">
								<label htmlFor="password" className="form-label fs-base">
									Password
								</label>
								<div className="password-toggle">
									<input
										type="password"
										id="password"
										className="form-control form-control-lg"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									<label
										className="password-toggle-btn"
										aria-label="Show/hide password"
									>
										<input className="password-toggle-check" type="checkbox" />
										<span className="password-toggle-indicator"></span>
									</label>
									<div className="invalid-feedback position-absolute start-0 top-100">
										Please enter a password!
									</div>
								</div>
							</div>
							<div className="col-12 mb-4">
								<label
									htmlFor="password-confirm"
									className="form-label fs-base"
								>
									Confirm password
								</label>
								<div className="password-toggle">
									<input
										type="password"
										id="password-confirm"
										className="form-control form-control-lg"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
									<label
										className="password-toggle-btn"
										aria-label="Show/hide password"
									>
										<input className="password-toggle-check" type="checkbox" />
										<span className="password-toggle-indicator"></span>
									</label>
									<div className="invalid-feedback position-absolute start-0 top-100">
										Please enter a password!
									</div>
								</div>
							</div>
						</div>
						<div className="mb-4">
							<div className="form-check">
								<input
									type="checkbox"
									id="terms"
									className="form-check-input"
								/>
								<label htmlFor="terms" className="form-check-label fs-base">
									I agree to <Link href="#">Terms &amp; Conditions</Link>
								</label>
							</div>
						</div>
						<button className="btn btn-primary shadow-primary btn-lg w-100">
							Sign up
						</button>
					</form>
				</div>
			</div>

			<div
				className="position-absolute top-0 end-0 w-50 h-100 bg-position-center bg-repeat-0 bg-size-cover d-none d-xl-block"
				style={{ backgroundImage: `url(/images/auth.jpg)` }}
			></div>
		</section>
	);
};

export default RegisterPage;
