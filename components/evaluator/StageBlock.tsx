import React from "react";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";

export interface StageBlockProps {
  title: React.ReactNode;
  subtitle?: string;
  status: "locked" | "loading" | "resolved" | "error";
  children?: React.ReactNode;
  onRetry?: () => void;
}

export function StageBlock({
  title,
  subtitle,
  status,
  children,
  onRetry,
}: StageBlockProps) {
  return (
    <div className={`stage-block stage-block-${status}`}>
      <div className="stage-block-header">
        <div className="stage-block-title type-h1">{title}</div>
        {subtitle && <span className="stage-block-subtitle type-body-sm">{subtitle}</span>}
      </div>

      <div className="stage-block-content">
        {status === "locked" && (
          <p className="stage-block-locked-text type-body-sm">
            Waiting on previous stage...
          </p>
        )}

        {status === "loading" && (
          <LoadingState message="Processing..." />
        )}

        {status === "error" && (
          <ErrorState
            message="Failed to process stage."
            onRetry={onRetry}
          />
        )}

        {status === "resolved" && children}
      </div>
    </div>
  );
}

export default StageBlock;
