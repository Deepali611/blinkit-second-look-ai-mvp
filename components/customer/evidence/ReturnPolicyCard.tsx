import React from "react";
import { RotateCcw } from "lucide-react";

export interface EvidenceCardProps {
  factStatement: string;
}

export function ReturnPolicyCard({ factStatement }: EvidenceCardProps) {
  return (
    <div className="evidence-card evidence-card-return">
      <div className="evidence-card-icon-badge evidence-badge-green">
        <RotateCcw size={22} />
      </div>
      <div className="evidence-card-content">
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default ReturnPolicyCard;
