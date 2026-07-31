import React from "react";
import { ResolvedBadge } from "./ResolvedBadge";

export interface AcknowledgmentBlockProps {
  failureType: string;
}

export function AcknowledgmentBlock({ failureType }: AcknowledgmentBlockProps) {
  let headlineText = "Here's what you need to continue your order —";

  switch (failureType) {
    case "expiry_authenticity":
      headlineText = "Here's what you need to continue your purchase safely.";
      break;
    case "missing_information":
      headlineText = "Here's the detail you needed to decide on this item.";
      break;
    case "unresolved_support":
      headlineText = "Your support request is resolved — here's how to move forward.";
      break;
    case "high_value_hesitation":
      headlineText = "Here's the guarantee to give you full peace of mind on this order.";
      break;
  }

  return (
    <section className="acknowledgment-block">
      <div style={{ marginBottom: "8px" }}>
        <ResolvedBadge label="Resolved" />
      </div>
      <h1 className="type-display acknowledgment-headline">{headlineText}</h1>
    </section>
  );
}

export default AcknowledgmentBlock;
