import React from "react";
import { BellOff } from "lucide-react";

export interface SuppressedNoticeProps {
  reason: string;
}

export function SuppressedNotice({ reason }: SuppressedNoticeProps) {
  return (
    <div className="suppressed-notice-card">
      <div className="suppressed-notice-icon">
        <BellOff size={24} />
      </div>
      <h3 className="suppressed-notice-title type-h1">Notification Correctly Held Back</h3>
      <p className="suppressed-notice-text type-body">
        This event was correctly held back by the system — no notification was sent.
      </p>
      <div className="suppressed-notice-reason-box type-body-sm">
        Reason Code: <code>{reason}</code>
      </div>
    </div>
  );
}

export default SuppressedNotice;
