"use client";

const ThemeToggleButton = () => {
	const handleToggle = () => {
		const current = document.documentElement.getAttribute("data-bs-theme");
		document.documentElement.setAttribute(
			"data-bs-theme",
			current === "dark" ? "light" : "dark"
		);
	};

	return (
		<div
			className="form-check form-switch mode-switch pe-lg-1 ms-auto me-4"
			data-bs-toggle="mode"
			onClick={handleToggle}
		>
			<input type="checkbox" className="form-check-input" id="theme-mode" />
			<label
				className="form-check-label d-none d-sm-block"
				htmlFor="theme-mode"
			>
				Light
			</label>
			<label
				className="form-check-label d-none d-sm-block"
				htmlFor="theme-mode"
			>
				Dark
			</label>
		</div>
	);
};

export default ThemeToggleButton;
