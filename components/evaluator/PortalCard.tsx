import React from "react";
import Link from "next/link";

export interface PortalCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  extraLine?: string;
}

export function PortalCard({ href, icon, title, description, extraLine }: PortalCardProps) {
  return (
    <Link href={href} className="portal-card">
      <div>
        <div className="portal-card-header">
          <div className="portal-card-icon">{icon}</div>
          <div className="portal-card-arrow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
        <div className="portal-card-content">
          <h2 className="portal-card-title">{title}</h2>
          <p className="portal-card-description">{description}</p>
          {extraLine && (
            <p className="portal-card-extraline type-body-sm" style={{ marginTop: "6px", color: "var(--blinkit-green)", fontWeight: 600 }}>
              {extraLine}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PortalCard;
