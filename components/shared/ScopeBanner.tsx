import React from "react";

export function ScopeBanner() {
  return (
    <aside className="scope-banner" aria-label="Evaluation scope disclaimer">
      <div className="scope-banner-icon">
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
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <p className="scope-banner-text">
        This is an evaluation prototype. Trigger events, verification data, and customer outcomes are simulated. Stage A (classification) uses a live AI model call; Stage B (verification) and Stage C (decision) are deterministic logic against mock data.
      </p>
    </aside>
  );
}

export default ScopeBanner;
