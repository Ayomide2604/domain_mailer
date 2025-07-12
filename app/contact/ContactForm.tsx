import React from "react";

const ContactForm = () => {
	return (
		<div className="col-xl-6 col-lg-7 offset-xl-2">
			<div className="card border-light shadow-lg py-3 p-sm-4 p-md-5">
				<div className="bg-dark position-absolute top-0 start-0 w-100 h-100 rounded-3 d-none d-dark-mode-block" />
				<div className="card-body position-relative zindex-2">
					<h2 className="card-title pb-3 mb-4">Contact Domain Mailer</h2>
					<form className="row g-4 needs-validation" noValidate>
						<div className="col-12">
							<label htmlFor="fn" className="form-label fs-base">
    Your Name
</label>
							<input
								type="text"
								className="form-control form-control-lg"
								id="fn"
								required
							/>
							<div className="invalid-feedback">
								Please enter your full name!
							</div>
						</div>
						<div className="col-12">
							<label htmlFor="email" className="form-label fs-base">
    Email Address
</label>
							<input
								type="email"
								className="form-control form-control-lg"
								id="email"
								required
							/>
							<div className="invalid-feedback">
								Please provid a valid email address!
							</div>
						</div>
						<div className="col-12">
    <label htmlFor="message" className="form-label fs-base">
        Message
    </label>
    <textarea
        className="form-control form-control-lg"
        id="message"
        rows={5}
        placeholder="How can we help you?"
        required
    />
    <div className="invalid-feedback">
        Please enter your message!
    </div>
</div>
						<div className="col-sm-6">
							
						</div>
						<div className="col-sm-6">
							
						</div>
						<div className="col-12 pt-2 pt-sm-3">
							<button
    type="submit"
    className="btn btn-lg btn-primary w-100 w-sm-auto"
>
    Send Message to Domain Mailer
</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
