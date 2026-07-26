import React from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

export interface EvidenceCardProps {
  factStatement: string;
}

export function ComplianceFactCard({ factStatement }: EvidenceCardProps) {
  return (
    <div className="evidence-card evidence-card-compliance">
      <div className="evidence-card-icon-badge evidence-badge-green">
        <ShieldCheck size={22} />
      </div>
      <div className="evidence-card-content">
        <div className="evidence-trust-badge">
          <CheckCircle size={14} />
          <span>Quality Verified ✓</span>
        </div>
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default ComplianceFactCard;
