import React from "react";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export interface ConfidenceBadgeProps {
  level: "high" | "medium" | "low" | string;
}

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const normalizedLevel = level?.toLowerCase();

  switch (normalizedLevel) {
    case "high":
      return (
        <span className="badge badge-confidence-high type-body-sm">
          <CheckCircle2 size={14} />
          <span>High confidence</span>
        </span>
      );
    case "medium":
      return (
        <span className="badge badge-confidence-medium type-body-sm">
          <AlertCircle size={14} />
          <span>Medium confidence</span>
        </span>
      );
    case "low":
    default:
      return (
        <span className="badge badge-confidence-low type-body-sm">
          <XCircle size={14} />
          <span>Low confidence</span>
        </span>
      );
  }
}

export default ConfidenceBadge;
