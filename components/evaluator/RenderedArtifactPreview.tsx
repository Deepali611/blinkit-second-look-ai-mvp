import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecisionResult } from "@/lib/decision/decide";

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
      <div className="artifact-preview-card artifact-suppressed">
        <h4 className="artifact-title type-h1">Notification Suppressed</h4>
        <p className="artifact-description type-body">
          No notification would be sent for this event.
        </p>
        {decisionResult.suppressReason && (
          <p className="artifact-reason type-body-sm">
            Reason: <code>{decisionResult.suppressReason}</code>
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
