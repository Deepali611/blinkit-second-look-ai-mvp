import React from "react";
import { Users, Star } from "lucide-react";

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
        <div className="evidence-star-rating-row">
          <div className="star-icons">
            <Star size={14} fill="#F8CB45" stroke="#F8CB45" />
            <Star size={14} fill="#F8CB45" stroke="#F8CB45" />
            <Star size={14} fill="#F8CB45" stroke="#F8CB45" />
            <Star size={14} fill="#F8CB45" stroke="#F8CB45" />
            <Star size={14} fill="#E5E5E2" stroke="#E5E5E2" />
          </div>
          <span className="type-body-sm rating-text">4.2 • Verified Buyer Rating</span>
        </div>
        <p className="evidence-card-statement type-body">{factStatement}</p>
      </div>
    </div>
  );
}

export default ReviewCountCard;
