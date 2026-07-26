import React from "react";
import { ShieldCheck, ShieldQuestion } from "lucide-react";

export interface VerificationStatusBadgeProps {
  status: "verified" | "unverifiable" | "not_yet_resolved" | string;
}

export function VerificationStatusBadge({ status }: VerificationStatusBadgeProps) {
  switch (status) {
    case "verified":
      return (
        <span className="badge badge-verification-verified type-body-sm">
          <ShieldCheck size={14} />
          <span>Verified</span>
        </span>
      );
    case "not_yet_resolved":
      return (
        <span className="badge badge-verification-unverifiable type-body-sm">
          <ShieldQuestion size={14} />
          <span>Not yet resolved</span>
        </span>
      );
    case "unverifiable":
    default:
      return (
        <span className="badge badge-verification-unverifiable type-body-sm">
          <ShieldQuestion size={14} />
          <span>Unverifiable</span>
        </span>
      );
  }
}

export default VerificationStatusBadge;
