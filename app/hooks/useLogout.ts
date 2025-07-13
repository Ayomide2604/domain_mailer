import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogout() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const logout = async (e: React.MouseEvent) => {
		setLoading(true);
		e.preventDefault();
		await signOut({ redirect: false });
		router.push("/login");
		toast.success("Logout successfully");
	};

	return { logout, loading };
}
