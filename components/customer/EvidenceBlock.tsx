import React from "react";
import ComplianceFactCard from "./evidence/ComplianceFactCard";
import ReviewCountCard from "./evidence/ReviewCountCard";
import TicketResolutionCard from "./evidence/TicketResolutionCard";
import ReturnPolicyCard from "./evidence/ReturnPolicyCard";
import AcknowledgmentOnlyCard from "./evidence/AcknowledgmentOnlyCard";

export interface EvidenceBlockProps {
  variant: string;
  factStatement: string;
}

export function EvidenceBlock({ variant, factStatement }: EvidenceBlockProps) {
  switch (variant) {
    case "expiry_authenticity":
      return <ComplianceFactCard factStatement={factStatement} />;
    case "missing_information":
      return <ReviewCountCard factStatement={factStatement} />;
    case "unresolved_support":
      return <TicketResolutionCard factStatement={factStatement} />;
    case "high_value_hesitation":
      return <ReturnPolicyCard factStatement={factStatement} />;
    case "acknowledgment_only":
    default:
      return <AcknowledgmentOnlyCard factStatement={factStatement} />;
  }
}

export default EvidenceBlock;
