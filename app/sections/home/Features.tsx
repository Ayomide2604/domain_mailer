import React from "react";

const Features = () => {
	return (
		<section className="position-relative py-5">
			<div className="container position-relative zindex-5 pb-md-4 pt-md-2 pt-lg-3 pb-lg-5">
				<div className="row justify-content-center text-center pb-3 mb-sm-2 mb-lg-3">
					<div className="col-xl-6 col-lg-7 col-md-9">
						<h2 className="h1 mb-lg-4">Why Choose Domain Mailer?</h2>
						<p className="fs-lg text-muted mb-0">
							Connect your domain and send emails with confidence. Enjoy a
							secure, collaborative, and professional email experience built for
							modern teams and businesses.
						</p>
					</div>
				</div>
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0 pb-xl-3">
					{/* Item */}
					<div className="col position-relative">
						<div className="card border-0 bg-transparent rounded-0 p-md-1 p-xl-3">
							<div className="d-table bg-secondary rounded-3 p-3 mx-auto mt-3 mt-md-4">
								<i
									className="bi bi-chat-dots"
									style={{ fontSize: 40 }}
									aria-label="Comments"
								></i>
							</div>
							<div className="card-body text-center">
								<h3 className="h5 pb-1 mb-2">Send from Your Domain</h3>
								<p className="mb-0">
									Easily connect your own domain and send emails that look
									trustworthy and professional—no more generic addresses.
								</p>
							</div>
						</div>
						<hr className="position-absolute top-0 end-0 w-1 h-100 d-none d-sm-block" />
						<hr className="position-absolute top-100 start-0 w-100 d-none d-sm-block" />
					</div>
					{/* Item */}
					<div className="col position-relative">
						<div className="card border-0 bg-transparent rounded-0 p-md-1 p-xl-3">
							<div className="d-table bg-secondary rounded-3 p-3 mx-auto mt-3 mt-md-4">
								<i
									className="bi bi-people"
									style={{ fontSize: 40 }}
									aria-label="Group"
								></i>
							</div>
							<div className="card-body text-center">
								<h3 className="h5 pb-1 mb-2">Team Collaboration</h3>
								<p className="mb-0">
									Invite your team, assign roles, and manage email campaigns
									together—all from one dashboard.
								</p>
							</div>
						</div>
						<hr className="position-absolute top-0 end-0 w-1 h-100 d-none d-sm-block d-md-none" />
						<hr className="position-absolute top-100 start-0 w-100 d-none d-sm-block" />
					</div>
					{/* Item */}
					<div className="col position-relative">
						<div className="card border-0 bg-transparent rounded-0 p-md-1 p-xl-3">
							<div className="d-table bg-secondary rounded-3 p-3 mx-auto mt-3 mt-md-4">
								<i
									className="bi bi-shield-lock"
									style={{ fontSize: 40 }}
									aria-label="Security"
								></i>
							</div>
							<div className="card-body text-center">
								<h3 className="h5 pb-1 mb-2">Data Security</h3>
								<p className="mb-0">
									Your data and emails are protected with industry-leading
									security and privacy standards.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="position-absolute top-0 start-0 w-100 h-100"
				style={{ backgroundColor: "rgba(255,255,255,.05)" }}
			/>
		</section>
	);
};

export default Features;
