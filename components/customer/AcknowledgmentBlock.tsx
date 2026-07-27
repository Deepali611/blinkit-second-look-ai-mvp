import React from "react";
import { ResolvedBadge } from "./ResolvedBadge";

export interface AcknowledgmentBlockProps {
  failureType: string;
}

export function AcknowledgmentBlock({ failureType }: AcknowledgmentBlockProps) {
  let headlineText = "About your recent order —";

  switch (failureType) {
    case "expiry_authenticity":
      headlineText = "We saw what happened with your order.";
      break;
    case "missing_information":
      headlineText = "We know you were deciding without enough to go on.";
      break;
    case "unresolved_support":
      headlineText = "About your support request —";
      break;
    case "high_value_hesitation":
      headlineText = "We get it — bigger purchases need more certainty.";
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
