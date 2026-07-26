import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="phone-frame-wrapper">
      <div className="phone-status-bar">
        <span className="status-bar-time">9:41</span>
        <div className="phone-frame-notch" />
        <div className="status-bar-icons">
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={14} />
        </div>
      </div>

      <div className="phone-frame-screen">{children}</div>
    </div>
  );
}

export default PhoneFrame;
