import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface ResolvedBadgeProps {
  label?: string;
}

export function ResolvedBadge({ label = "Resolved" }: ResolvedBadgeProps) {
  return (
    <span
      className="resolved-badge-chip"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        backgroundColor: "rgba(84, 178, 38, 0.12)",
        color: "var(--blinkit-green)",
        border: "1px solid rgba(84, 178, 38, 0.25)",
        borderRadius: "20px",
        padding: "3px 9px",
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: "1.2",
        flexShrink: 0,
      }}
    >
      <CheckCircle2 size={13} style={{ color: "var(--blinkit-green)" }} />
      <span>{label}</span>
    </span>
  );
}

export default ResolvedBadge;
