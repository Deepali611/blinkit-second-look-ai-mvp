"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export interface SimulateOutcomeButtonProps {
  eventId: string;
  outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed" | string;
  label: string;
  caption?: string;
  isProminent?: boolean;
}

export function SimulateOutcomeButton({
  eventId,
  outcomeType,
  label,
  caption,
  isProminent = false,
}: SimulateOutcomeButtonProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleSimulate = async () => {
    setIsLogging(true);
    try {
      const res = await fetch("/api/outcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, outcomeType }),
      });

      if (res.ok) {
        setLogged(true);
        setTimeout(() => setLogged(false), 3000);
      }
    } catch (err) {
      console.error("Failed to simulate outcome:", err);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className={`simulate-outcome-wrapper ${isProminent ? "simulate-prominent" : ""}`}>
      <button
        type="button"
        className={`simulate-outcome-btn ${isProminent ? "simulate-btn-prominent" : ""}`}
        onClick={handleSimulate}
        disabled={isLogging}
        style={
          isProminent
            ? {
                backgroundColor: "var(--blinkit-white)",
                border: "2px solid var(--blinkit-green)",
                color: "var(--blinkit-near-black)",
                fontWeight: 700,
                padding: "12px 18px",
                boxShadow: "0 2px 10px rgba(84, 178, 38, 0.15)",
              }
            : {}
        }
      >
        <span>{label}</span>
      </button>

      {caption && (
        <span
          className="simulate-caption-subtext type-body-sm"
          style={{
            fontSize: "12px",
            color: isProminent ? "var(--blinkit-green)" : "var(--text-muted)",
            fontWeight: isProminent ? 600 : 400,
            marginTop: "4px",
          }}
        >
          {caption}
        </span>
      )}

      {logged && (
        <div className="simulate-toast type-body-sm">
          <Check size={14} />
          <span>Outcome logged to metrics.</span>
        </div>
      )}
    </div>
  );
}

export default SimulateOutcomeButton;
