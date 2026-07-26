import React from "react";
import { Users } from "lucide-react";

export interface EvidenceCardProps {
  factStatement: string;
}

export function ReviewCountCard({ factStatement }: EvidenceCardProps) {
  return (
    <div className="evidence-card evidence-card-reviews">
      <div className="evidence-card-icon-badge evidence-badge-green">
        <Users size={22} />
      </div>
      <div className="evidence-card-content">
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default ReviewCountCard;
