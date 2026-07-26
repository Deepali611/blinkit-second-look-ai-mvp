import React, { useState } from "react";
import { Check } from "lucide-react";

export interface SecondaryOptOutLinkProps {
  onOptOut?: () => void;
}

export function SecondaryOptOutLink({ onOptOut }: SecondaryOptOutLinkProps) {
  const [optedOut, setOptedOut] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOptedOut(true);
    if (onOptOut) {
      onOptOut();
    }
  };

  if (optedOut) {
    return (
      <div className="opt-out-confirmation type-body-sm">
        <Check size={16} className="opt-out-check-icon" />
        <span>Got it — you won't see this again for this category.</span>
      </div>
    );
  }

  return (
    <div className="opt-out-container">
      <button
        type="button"
        className="opt-out-link type-body-sm"
        onClick={handleClick}
      >
        Don't show me this again
      </button>
    </div>
  );
}

export default SecondaryOptOutLink;
