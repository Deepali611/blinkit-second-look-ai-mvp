"use client";

import React, { useState } from "react";
import { selectQuickTake } from "@/lib/decision/quickTake";
import { X } from "lucide-react";

export interface QuickTakeCardProps {
  categoryId?: string;
  onDismiss?: () => void;
}

export function QuickTakeCard({ categoryId = "", onDismiss }: QuickTakeCardProps) {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed) {
    return null;
  }

  const { questionText, answerText } = selectQuickTake(categoryId);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className="quick-take-card"
      style={{
        backgroundColor: "#F8F8F6",
        border: "1px solid var(--border-hairline, #E5E5E2)",
        borderRadius: "12px",
        padding: "12px 14px",
        marginBottom: "12px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "20px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--blinkit-near-black, #1F1F1F)",
            lineHeight: "18px",
          }}
        >
          {questionText}
        </span>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss note"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            color: "var(--text-muted, #777777)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <X size={15} />
        </button>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "12px",
          color: "var(--text-muted, #555555)",
          lineHeight: "17px",
          fontWeight: 400,
        }}
      >
        {answerText}
      </p>
    </div>
  );
}

export default QuickTakeCard;
