import React from "react";
import { Info } from "lucide-react";
import { SCOPE_BANNER_FULL, SCOPE_BANNER_COMPACT } from "@/lib/copy/canonical";

export interface ScopeBannerProps {
  compact?: boolean;
  variant?: "full" | "compact";
}

export function ScopeBanner({ compact, variant = "full" }: ScopeBannerProps) {
  const isCompact = compact !== undefined ? compact : variant === "compact";
  const bannerText = isCompact ? SCOPE_BANNER_COMPACT : SCOPE_BANNER_FULL;

  return (
    <aside
      className={`scope-banner ${isCompact ? "scope-banner-compact" : ""}`}
      aria-label="Evaluation scope disclaimer"
    >
      <div className="scope-banner-icon">
        <Info size={isCompact ? 16 : 20} />
      </div>
      <p className={`scope-banner-text ${isCompact ? "scope-banner-text-compact" : ""}`}>
        {bannerText}
      </p>
    </aside>
  );
}

export default ScopeBanner;
