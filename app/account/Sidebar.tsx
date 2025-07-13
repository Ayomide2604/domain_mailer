"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import defaultProfile from "../images/default_profile.svg";
import Image from "next/image";

const Sidebar = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const user = session?.user;
	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		await signOut({ redirect: false });
		router.push("/login");
		toast.success("Logout successfully");
	};

	return (
		<aside className="col-lg-3 col-md-4 border-end pb-5 mt-n5">
			<div className="position-sticky top-0">
				<div className="text-center pt-5">
					<div className="d-table position-relative mx-auto mt-2 mt-lg-4 pt-5 mb-3">
						<Image
							className="img-fluid "
							src={defaultProfile}
							alt="profile"
							style={{
								objectFit: "cover",
								width: 100,
								height: 100,
								borderRadius: 50,
							}}
						/>
						<button
							type="button"
							className="btn btn-icon btn-light bg-white btn-sm border rounded-circle shadow-sm position-absolute bottom-0 end-0 mt-4"
							data-bs-toggle="tooltip"
							data-bs-placement="bottom"
							aria-label="Change picture"
							data-bs-original-title="Change picture"
						>
							<i className="bx bx-refresh" />
						</button>
					</div>
					<h2 className="h5 mb-1">{user?.name}</h2>
					<p className="mb-3 pb-3">{user?.email}</p>
					<button
						type="button"
						className="btn btn-secondary w-100 d-md-none mt-n2 mb-3"
						data-bs-toggle="collapse"
						data-bs-target="#account-menu"
					>
						<i className="bx bxs-user-detail fs-xl me-2" />
						Account menu
						<i className="bx bx-chevron-down fs-lg ms-1" />
					</button>
					<div
						id="account-menu"
						className="list-group list-group-flush collapse d-md-block"
					>
						<a
							href="account-details.html"
							className="list-group-item list-group-item-action d-flex align-items-center active"
						>
							<i className="bx bx-cog fs-xl opacity-60 me-2" />
							Profile
						</a>
						<a
							href="account-security.html"
							className="list-group-item list-group-item-action d-flex align-items-center"
						>
							<i className="bx bx-lock-alt fs-xl opacity-60 me-2" />
							Security
						</a>

						<a
							href="#"
							onClick={handleLogout}
							className="list-group-item list-group-item-action d-flex align-items-center"
						>
							<i className="bx bx-log-out fs-xl opacity-60 me-2" />
							Sign Out
						</a>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
