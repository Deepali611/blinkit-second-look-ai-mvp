import React from "react";
import { Info } from "lucide-react";

export interface ScopeBannerProps {
  compact?: boolean;
}

export function ScopeBanner({ compact = false }: ScopeBannerProps) {
  return (
    <aside
      className={`scope-banner ${compact ? "scope-banner-compact" : ""}`}
      aria-label="Evaluation scope disclaimer"
    >
      <div className="scope-banner-icon">
        <Info size={compact ? 16 : 20} />
      </div>
      <p className={`scope-banner-text ${compact ? "scope-banner-text-compact" : ""}`}>
        This is an evaluation prototype. Trigger events, verification data, and customer outcomes are simulated. Stage A (classification) uses a live AI model call; Stage B (verification) and Stage C (decision) are deterministic logic against mock data.
      </p>
    </aside>
  );
}

export default ScopeBanner;
