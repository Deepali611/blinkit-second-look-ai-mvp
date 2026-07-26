import React from "react";

export interface EvaluatorOnlyRibbonProps {
  text: string;
}

export function EvaluatorOnlyRibbon({ text }: EvaluatorOnlyRibbonProps) {
  return (
    <div className="evaluator-only-ribbon">
      <span className="type-body-sm">{text}</span>
    </div>
  );
}

export default EvaluatorOnlyRibbon;
