import React from "react";

const Hero = () => {
	return (
		<section className="position-relative overflow-hidden zindex-2 pt-4 pt-md-5">
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<div className="col-xl-6 col-lg-7 col-md-6 col-sm-8 col-10 offset-xl-1 order-md-2">
						{/* <div className="parallax mx-auto" style={{ maxWidth: 556 }}>
							<div className="parallax-layer" data-depth="0.1">
								<img src={hero1} alt="Bubble" />
							</div>
							<div className="parallax-layer" data-depth="-0.2">
								<img src={hero2} alt="Bubble" />
							</div>
							<div className="parallax-layer" data-depth="-0.3">
								<img src={hero3} alt="Bubble" />
							</div>
							<div className="parallax-layer" data-depth="0.4">
								<img src={hero4} alt="Bubble" />
							</div>
							<div className="parallax-layer" data-depth="-0.1">
								<img src={hero5} alt="Screen" />
							</div>
							<div className="parallax-layer" data-depth="0.2">
								<img src={hero6} alt="Screen" />
							</div>
						</div> */}
					</div>
					{/* Text */}
					<div className="col-lg-5 col-md-6 text-center text-md-start order-md-1">
						<h1 className="display-5 mb-lg-4">Send Bulk Emails with Ease</h1>
						<p className="fs-xl pb-3 pb-lg-0 mb-4 mb-lg-5">
							Reach your audience instantly with our simple and powerful bulk
							email platform. Manage contacts, personalize messages, and track
							results—all in one place.
						</p>
						<div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
							<a
								href="#"
								className="btn btn-dark btn-lg px-3 py-2 me-sm-3 me-lg-4 mb-3"
							>
								Get Started <i className="bi bi-envelope ms-2" />
							</a>
						</div>
						<div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
							{/* <img src="" alt="" /> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
