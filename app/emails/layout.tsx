import React from "react";
import Sidebar from "./Sidebar";

export default function EmailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-grow-1 bg-white" style={{ minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
