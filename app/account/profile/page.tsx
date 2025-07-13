import React from "react";

const ProfilePage = () => {
	return (
		<div className="ps-md-3 ps-lg-0 mt-md-2 py-md-4">
			<h1 className="h2 pt-xl-1 pb-3">Account Details</h1>
			{/* Basic info */}
			<h2 className="h5 text-primary mb-4">Basic info</h2>
			<form className="needs-validation border-bottom pb-3 pb-lg-4" noValidate>
				<div className="row pb-2">
					<div className="col-sm-6 mb-4">
						<label htmlFor="fn" className="form-label fs-base">
							First name
						</label>
						<input
							type="text"
							id="fn"
							className="form-control form-control-lg"
							defaultValue="John"
							required
						/>
						<div className="invalid-feedback">
							Please enter your first name!
						</div>
					</div>
					<div className="col-sm-6 mb-4">
						<label htmlFor="sn" className="form-label fs-base">
							Last name
						</label>
						<input
							type="text"
							id="sn"
							className="form-control form-control-lg"
							defaultValue="Doe"
							required
						/>
						<div className="invalid-feedback">
							Please enter your second name!
						</div>
					</div>
					<div className="col-sm-6 mb-4">
						<label htmlFor="email" className="form-label fs-base">
							Email address
						</label>
						<input
							type="email"
							id="email"
							className="form-control form-control-lg"
							defaultValue="jonny@email.com"
							required
						/>
						<div className="invalid-feedback">
							Please provide a valid email address!
						</div>
					</div>
					<div className="col-sm-6 mb-4">
						<label htmlFor="phone" className="form-label fs-base">
							Phone <small className="text-muted">(optional)</small>
						</label>
						<input
							type="text"
							id="phone"
							className="form-control form-control-lg"
						/>
					</div>
					<div className="col-12 mb-4">
						<label htmlFor="bio" className="form-label fs-base">
							Bio <small className="text-muted">(optional)</small>
						</label>
						<textarea
							id="bio"
							className="form-control form-control-lg"
							rows={4}
							placeholder="Add a short bio..."
							defaultValue={""}
						/>
					</div>
				</div>
				<div className="d-flex mb-3">
					<button type="reset" className="btn btn-secondary me-3">
						Cancel
					</button>
					<button type="submit" className="btn btn-primary">
						Save changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfilePage;
