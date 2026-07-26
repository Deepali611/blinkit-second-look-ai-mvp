import React, { useState } from "react";
import { RotateCcw, Star, MessageCircle, IndianRupee, CircleDollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { EventDetail } from "@/lib/db/events";

export interface RawEventPanelProps {
  event: EventDetail;
}

function getSignalIcon(triggerType: string) {
  switch (triggerType?.toLowerCase()) {
    case "return":
      return <RotateCcw size={16} aria-label="Return" />;
    case "rating":
      return <Star size={16} aria-label="Rating" />;
    case "ticket":
      return <MessageCircle size={16} aria-label="Ticket" />;
    case "refund":
      return <IndianRupee size={16} aria-label="Refund" />;
    default:
      return <CircleDollarSign size={16} aria-label="Signal" />;
  }
}

export function RawEventPanel({ event }: RawEventPanelProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <div className="raw-event-panel">
      <div className="raw-event-header">
        <div className="raw-event-meta">
          <span className="raw-event-badge type-body-sm">
            {getSignalIcon(event.triggerType)}
            <span>{event.triggerType}</span>
          </span>
          <span className="raw-event-customer type-h1">{event.customerAlias}</span>
          <span className="raw-event-category type-body-sm">• {event.category}</span>
          <span className="raw-event-value type-body-sm">(₹{event.orderValue})</span>
        </div>

        <button
          type="button"
          className="raw-event-mobile-toggle"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        >
          <span>{isMobileExpanded ? "Hide raw event" : "Show raw event"}</span>
          {isMobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className={`raw-event-body ${isMobileExpanded ? "mobile-expanded" : ""}`}>
        <p className="raw-event-label type-body-sm">Raw Feedback Text:</p>
        <pre className="raw-event-text type-mono">
          {event.rawText ? `"${event.rawText}"` : "(No feedback text provided)"}
        </pre>
      </div>
    </div>
  );
}

export default RawEventPanel;
