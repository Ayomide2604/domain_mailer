"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";

const HIDE_HEADER_PATHS = ["/emails"];

export default function HeaderWrapper() {
	const pathname = usePathname();
	// Hide header only if the current path exactly matches one in the list
	const hideHeader = HIDE_HEADER_PATHS.includes(pathname);
	return !hideHeader ? <Header /> : null;
}