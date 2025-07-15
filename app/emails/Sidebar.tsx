"use client";
import React from "react";
import Link from "next/link";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sidebar content
  const content = (
    <aside
      className={`sidebar-main d-flex flex-column bg-body-tertiary p-3 h-100${isMobile ? ' mobile-sidebar' : ''}${isMobile && open ? ' open' : ''}`}
      style={isMobile ? { minWidth: 220, maxWidth: 320, width: '80vw', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1201, transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', boxShadow: open ? '2px 0 16px rgba(0,0,0,0.12)' : undefined } : { minWidth: 220, borderRight: '1px solid #eee' }}
      tabIndex={-1}
    >
      {isMobile && (
        <button
          className="btn btn-link text-dark align-self-end mb-2"
          style={{ fontSize: 28, marginRight: -8 }}
          onClick={onClose}
          title="Close Sidebar"
        >
          &times;
        </button>
      )}
      <h5 className="mb-4 fw-bold">
        <Link href="/" className="nav-link">
          Mailer
        </Link>
      </h5>
      <nav className="nav flex-column gap-2">
        <Link href="/emails" className="nav-link">
          Compose
        </Link>
        <Link href="/emails/inbox" className="nav-link">
          Inbox
        </Link>
        <Link href="/emails/sent" className="nav-link">
          Sent
        </Link>
        <Link href="/emails/drafts" className="nav-link">
          Drafts
        </Link>
        {/* Add more links as needed */}
      </nav>
    </aside>
  );

  return (
    <>
      {isMobile && open && (
        <div
          className="sidebar-backdrop"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1200 }}
          onClick={onClose}
        />
      )}
      {content}
    </>
  );
};

export default Sidebar;
