import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface EvidenceCardProps {
  factStatement: string;
}

export function TicketResolutionCard({ factStatement }: EvidenceCardProps) {
  return (
    <div className="evidence-card evidence-card-ticket">
      <div className="evidence-card-icon-badge evidence-badge-green">
        <CheckCircle2 size={22} />
      </div>
      <div className="evidence-card-content">
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default TicketResolutionCard;
