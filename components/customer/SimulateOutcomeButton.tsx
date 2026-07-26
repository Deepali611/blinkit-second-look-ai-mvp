"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export interface SimulateOutcomeButtonProps {
  eventId: string;
  outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed" | string;
  label: string;
}

export function SimulateOutcomeButton({
  eventId,
  outcomeType,
  label,
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
    <div className="simulate-outcome-wrapper">
      <span className="simulate-caption type-body-sm">EVALUATOR ONLY</span>
      <button
        type="button"
        className="simulate-outcome-btn"
        onClick={handleSimulate}
        disabled={isLogging}
      >
        <span>{label}</span>
      </button>

      {logged && (
        <div className="simulate-toast type-body-sm">
          <Check size={14} />
          <span>Outcome logged.</span>
        </div>
      )}
    </div>
  );
}

export default SimulateOutcomeButton;
