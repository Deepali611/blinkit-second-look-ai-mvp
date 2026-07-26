import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading events..." }: LoadingStateProps) {
  return (
    <div className="loading-state-container">
      <Loader2 className="loading-spinner" size={20} />
      <span className="loading-message type-body-sm">{message}</span>
    </div>
  );
}

export default LoadingState;
