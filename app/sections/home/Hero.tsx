import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<section className="position-relative overflow-hidden zindex-2 pt-4 pt-md-5">
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<div className="col-xl-6 col-lg-7 col-md-6 col-sm-8 col-10 offset-xl-1 order-md-2 d-flex justify-content-center">
						<Image
							src="/tablet-mockup.png"
							alt="Tablet Mockup"
							className="img-fluid w-100"
							width={556}
							height={400}
						/>
					</div>
					<div className="col-lg-5 col-md-6 text-center text-md-start order-md-1">
						<h1 className="display-5 mb-lg-4">Send Bulk Emails with Ease</h1>
						<p className="fs-xl pb-3 pb-lg-0 mb-4 mb-lg-5">
							Reach your audience instantly with our simple and powerful bulk
							email platform. Manage contacts, personalize messages, and track
							results—all in one place.
						</p>
						<div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
							<Link
								href="/register"
								className="btn btn-dark btn-lg px-3 py-2 me-sm-3 me-lg-4 mb-3"
							>
								Get Started <i className="bi bi-envelope ms-2" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
