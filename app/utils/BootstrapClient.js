"use client";

import { useEffect } from "react";

const BootstrapClient = () => {
	useEffect(() => {
		// Dynamically import Bootstrap's JS
		import("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);

	return null;
};

export default BootstrapClient;
