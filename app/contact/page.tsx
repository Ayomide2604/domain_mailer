import React from "react";
import ContactForm from "./ContactForm";

const ContactPage = () => {
	return (
		<section className="position-relative bg-secondary">
			<div className="container position-relative zindex-2 pt-5">
				<div className="row">
					{/* Contact links */}
					<div className="col-xl-4 col-lg-5 pb-4 pb-sm-5 mb-2 mb-sm-0">
						<div className="pe-lg-4 pe-xl-0">
							<h1 className="pb-3 pb-md-4 mb-lg-5">Contact Domain Mailer</h1>
							<div className="d-flex align-items-start pb-3 mb-sm-1 mb-md-3">
								<div className="bg-light text-primary rounded-circle flex-shrink-0 fs-3 lh-1 p-3">
									<i className="bx bx-envelope" />
								</div>
								<div className="ps-3 ps-sm-4">
									<h2 className="h4 pb-1 mb-2">Email Domain Mailer</h2>
<p className="mb-2">
    Reach out to the Domain Mailer team for any questions, partnership opportunities, or product support. We respond quickly!
</p>
<div className="btn btn-link btn-lg px-0">
    Message Domain Mailer
    <i className="bx bx-right-arrow-alt lead ms-2" />
</div>
								</div>
							</div>
							<div className="d-flex align-items-start">
								<div className="bg-light text-primary rounded-circle flex-shrink-0 fs-3 lh-1 p-3">
									<i className="bx bx-group" />
								</div>
								<div className="ps-3 ps-sm-4">
									<h2 className="h4 pb-1 mb-2">Careers at Domain Mailer</h2>
<p className="mb-2">
    Interested in joining the Domain Mailer team? We’re always looking for talented individuals passionate about email technology and communication.
</p>
<div className="btn btn-link btn-lg px-0">
    Apply to Domain Mailer
    <i className="bx bx-right-arrow-alt lead ms-2" />
</div>
								</div>
							</div>
						</div>
					</div>
					{/* Contact form */}
					<ContactForm />
				</div>
			</div>
			<div
				className="position-absolute bottom-0 start-0 w-100 bg-light"
				style={{ height: "8rem" }}
			/>
		</section>
	);
};

export default ContactPage;
