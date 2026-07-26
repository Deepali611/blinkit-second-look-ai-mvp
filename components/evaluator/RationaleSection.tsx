import React from "react";

export interface RationaleSectionProps {
  title: string;
  mechanism: string;
  whereAI: string;
  customerImpact: string;
  isAI: boolean;
}

export function RationaleSection({
  title,
  mechanism,
  whereAI,
  customerImpact,
  isAI,
}: RationaleSectionProps) {
  return (
    <div className="rationale-section-card">
      <h2 className="type-h1 rationale-title">{title}</h2>

      <div className="rationale-blocks-stack">
        <div className="rationale-block">
          <h3 className="type-h1 rationale-label">What it does</h3>
          <p className="type-body rationale-text">{mechanism}</p>
        </div>

        <div
          className={`rationale-block ${
            isAI ? "rationale-accent-amber" : "rationale-accent-gray"
          }`}
        >
          <h3 className="type-h1 rationale-label">
            {isAI ? "Where AI does the lifting" : "Why this is deterministic, not AI"}
          </h3>
          <p className="type-body rationale-text">{whereAI}</p>
        </div>

        <div className="rationale-block rationale-accent-green">
          <h3 className="type-h1 rationale-label">
            What it changes for the customer
          </h3>
          <p className="type-body rationale-text">{customerImpact}</p>
        </div>
      </div>
    </div>
  );
}

export default RationaleSection;
