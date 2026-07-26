import React from "react";
import Link from "next/link";

export interface BlinkitHeaderProps {
  variant?: "evaluator" | string;
}

export function BlinkitHeader({ variant = "evaluator" }: BlinkitHeaderProps) {
  return (
    <header className="blinkit-header">
      <div className="header-content">
        <Link href="/" className="logo-container">
          <div className="blinkit-badge">
            <span className="logo-text">blinkit</span>
          </div>
          <span className="logo-divider">/</span>
          <span className="portal-title">
            {variant === "evaluator" ? "Evaluator Portal" : "Second Look"}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default BlinkitHeader;
