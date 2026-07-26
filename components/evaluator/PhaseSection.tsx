import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface PhaseSectionProps {
  phaseNumber: number;
  title: string;
  description: string;
  checklist: string[];
  children?: React.ReactNode;
}

export function PhaseSection({
  phaseNumber,
  title,
  description,
  checklist,
  children,
}: PhaseSectionProps) {
  return (
    <div className="phase-section-card">
      <div className="phase-header">
        <div className="phase-badge">
          <span>{phaseNumber}</span>
        </div>
        <div className="phase-header-content">
          <h2 className="type-h1 phase-title">Phase {phaseNumber} — {title}</h2>
          <p className="type-body phase-description">{description}</p>
        </div>
      </div>

      <div className="phase-checklist">
        {checklist.map((item, index) => (
          <div key={index} className="checklist-item">
            <CheckCircle2 size={18} className="checklist-icon" />
            <span className="type-body-sm checklist-text">{item}</span>
          </div>
        ))}
      </div>

      {children && <div className="phase-actions">{children}</div>}
    </div>
  );
}

export default PhaseSection;
