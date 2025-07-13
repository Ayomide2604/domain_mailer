import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
type AccountLayoutProps = {
	children: ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
	return (
		<section className="container pt-5">
			<div className="row">
				<Sidebar />
				{children}
			</div>
		</section>
	);
}
