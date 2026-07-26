import React from "react";

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state-container">
      <p className="error-state-message type-body">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="error-state-retry-btn"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
