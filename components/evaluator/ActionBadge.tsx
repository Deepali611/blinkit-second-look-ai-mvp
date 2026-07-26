import React from "react";
import { Bell, BellOff } from "lucide-react";

export interface ActionBadgeProps {
  action: "act" | "suppress" | string;
}

export function ActionBadge({ action }: ActionBadgeProps) {
  if (action === "act") {
    return (
      <span className="badge badge-action-act type-body-sm">
        <Bell size={14} />
        <span>Action: Notify</span>
      </span>
    );
  }

  return (
    <span className="badge badge-action-suppress type-body-sm">
      <BellOff size={14} />
      <span>Action: Suppressed</span>
    </span>
  );
}

export default ActionBadge;
