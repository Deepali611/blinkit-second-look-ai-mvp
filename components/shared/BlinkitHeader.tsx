import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface BlinkitHeaderProps {
  variant?: "evaluator" | string;
  backHref?: string;
}

export function BlinkitHeader({ backHref }: BlinkitHeaderProps) {
  return (
    <header className="blinkit-header">
      <div className="header-content">
        <div className="header-left">
          {backHref && (
            <Link href={backHref} className="header-back-link" aria-label="Go back">
              <ArrowLeft size={18} />
              <span>Back</span>
            </Link>
          )}
          <Link href="/" className="logo-container">
            <div className="blinkit-badge">
              <span className="logo-text">blinkit</span>
            </div>
            <span className="logo-divider">/</span>
            <span className="portal-title">Second Look</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default BlinkitHeader;
