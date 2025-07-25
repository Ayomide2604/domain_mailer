"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "../components/Loader";

const LoginPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const res = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email.toLowerCase(),
				password,
			}),
		});
		const data = await res.json();

		if (!res.ok) {
			setLoading(false);

			if (data?.message) {
				toast.error(data.message);
			} else {
				toast.error("Login failed, An Unexpected Error Occurred");
			}
		} else {
			// If it passes the checks we can sign in
			const response = await signIn("credentials", {
				email: email.toLowerCase(),
				password,
				redirect: false,
			});
			if (response?.ok) {
				router.push("/");
				toast.success("Login successful");
				setLoading(false);
			} else {
				toast.error("Login failed, An Unexpected Error Occurred");
				setLoading(false);
			}
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<section className="position-relative h-100 mb-5">
			<div className="container d-flex flex-wrap justify-content-center justify-content-xl-start h-100">
				<div
					className="w-100 align-self-end pt-1 pt-md-4 pb-4"
					style={{ maxWidth: 526 }}
				>
					<Link href="/">
						{/* <img
							src={logo}
							alt="logo"
							className="mb-4 img-fluid"
							style={{ maxWidth: 50 }}
						/> */}
					</Link>
					<h1 className="text-center text-xl-start">Welcome Back</h1>
					<p className="text-center text-xl-start pb-3 mb-3">
						Don’t have an account yet?{" "}
						<Link href="/register">Register here.</Link>
					</p>
					<form className="needs-validation mb-2" onSubmit={handleLogin}>
						<div className="position-relative mb-4">
							<label htmlFor="email" className="form-label fs-base">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="form-control form-control-lg"
								required
							/>
							<div className="invalid-feedback position-absolute start-0 top-100">
								Please enter a valid email address!
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="form-label fs-base">
								Password
							</label>
							<div className="password-toggle">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="form-control form-control-lg"
									required
								/>
								<label
									className="password-toggle-btn"
									aria-label="Show/hide password"
								>
									<input className="password-toggle-check" type="checkbox" />
									<span onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<i className="bi-eye-slash" />
										) : (
											<i className="bi-eye" />
										)}
									</span>
								</label>
								<div className="invalid-feedback position-absolute start-0 top-100">
									Please enter your password!
								</div>
							</div>
						</div>
						<div className="mb-4">
							<div className="form-check">
								<input
									type="checkbox"
									id="remember"
									className="form-check-input"
								/>
								<label htmlFor="remember" className="form-check-label fs-base">
									Remember me
								</label>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-primary shadow-primary btn-lg w-100"
						>
							Sign in
						</button>
					</form>
					<Link href="#" className="btn btn-link btn-lg w-100">
						Forgot your password?
					</Link>
				</div>
			</div>

			<div
				className="position-absolute top-0 end-0 w-50 h-100 bg-position-center bg-repeat-0 bg-size-cover d-none d-xl-block"
				style={{ backgroundImage: `url(/images/auth.jpg)` }}
			></div>
		</section>
	);
};

export default LoginPage;
