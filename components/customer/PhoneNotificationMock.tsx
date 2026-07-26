import React from "react";

export interface PhoneNotificationMockProps {
  copyText: string;
  triggerType?: string;
  timestamp?: string;
  onClick?: () => void;
}

export function PhoneNotificationMock({
  copyText,
  timestamp = "Just now",
  onClick,
}: PhoneNotificationMockProps) {
  return (
    <div
      className="phone-notification-banner"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <div className="notification-header">
        <div className="notification-app-info">
          <div className="notification-badge">
            <span className="notification-logo-text">blinkit</span>
          </div>
          <span className="notification-app-name type-body-sm">Blinkit</span>
        </div>
        <span className="notification-timestamp type-body-sm">{timestamp}</span>
      </div>
      <p className="notification-copy type-body">{copyText}</p>
    </div>
  );
}

export default PhoneNotificationMock;
