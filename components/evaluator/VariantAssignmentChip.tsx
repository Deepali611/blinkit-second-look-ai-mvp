"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface VariantAssignmentChipProps {
  variant: string;
}

export function VariantAssignmentChip({ variant }: VariantAssignmentChipProps) {
  return (
    <div
      className="variant-assignment-chip"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: "rgba(56, 189, 248, 0.1)",
        border: "1px solid var(--evaluator-accent, #38BDF8)",
        color: "var(--evaluator-accent, #38BDF8)",
        padding: "4px 10px",
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: 600,
        marginTop: "10px",
      }}
    >
      <Sparkles size={13} />
      <span>Experiment variant: <strong>{variant}</strong></span>
    </div>
  );
}

export default VariantAssignmentChip;
