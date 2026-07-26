import React from "react";
import { Info } from "lucide-react";

export interface EvidenceCardProps {
  factStatement: string;
}

export function AcknowledgmentOnlyCard({ factStatement }: EvidenceCardProps) {
  return (
    <div className="evidence-card evidence-card-acknowledgment">
      <div className="evidence-card-icon-badge evidence-badge-amber">
        <Info size={22} />
      </div>
      <div className="evidence-card-content">
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default AcknowledgmentOnlyCard;
