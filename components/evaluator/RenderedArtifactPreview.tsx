import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DecisionResult } from "@/lib/decision/decide";
import { HELD_BACK_EXPLANATION } from "@/lib/copy/canonical";

export interface RenderedArtifactPreviewProps {
  eventId: string;
  decisionResult: DecisionResult;
}

export function RenderedArtifactPreview({
  eventId,
  decisionResult,
}: RenderedArtifactPreviewProps) {
  if (decisionResult.action === "suppress") {
    return (
      <div className="artifact-preview-card artifact-suppressed" style={{ backgroundColor: "var(--surface-muted)", border: "1.5px solid var(--border-hairline)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--blinkit-near-black)" }}>
          <CheckCircle2 size={18} style={{ color: "var(--blinkit-green)" }} />
          <h4 className="artifact-title type-h1" style={{ fontSize: "16px" }}>Decision Outcome: Notification Suppressed</h4>
        </div>
        <p className="artifact-description type-body" style={{ fontWeight: 500, color: "var(--blinkit-near-black)", marginTop: "4px" }}>
          {HELD_BACK_EXPLANATION}
        </p>
        {decisionResult.suppressReason && (
          <p className="artifact-reason type-body-sm" style={{ color: "var(--text-muted)", marginTop: "4px" }}>
            Policy Reason: <code>{decisionResult.suppressReason}</code>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="artifact-preview-card artifact-active">
      <div className="artifact-content">
        <h4 className="artifact-title type-h1">Notification Ready</h4>
        <p className="artifact-copy type-body">
          "{decisionResult.notificationCopy}"
        </p>
      </div>

      <Link
        href={`/second-look-demo?eventId=${eventId}`}
        className="artifact-link-btn"
      >
        <span>View simulated notification</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default RenderedArtifactPreview;
