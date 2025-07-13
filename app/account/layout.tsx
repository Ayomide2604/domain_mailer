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
				<div className="col-md-8 offset-lg-1 pb-5 mb-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0">
					{children}
				</div>
			</div>
		</section>
	);
}
