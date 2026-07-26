import React from "react";

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="phone-frame-wrapper">
      <div className="phone-frame-notch" />
      <div className="phone-frame-screen">{children}</div>
    </div>
  );
}

export default PhoneFrame;
