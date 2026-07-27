import React from "react";
import { RotateCcw, Star, MessageCircle, IndianRupee, CircleDollarSign } from "lucide-react";
import { EventDetail } from "@/lib/db/events";

export interface RawEventPanelProps {
  event: EventDetail;
}

function getSignalLabel(triggerType: string) {
  switch (triggerType?.toLowerCase()) {
    case "return":
      return { icon: <RotateCcw size={15} />, label: "Return", attribution: "— from a return note" };
    case "rating":
      return { icon: <Star size={15} />, label: "Low rating", attribution: "— from a rating" };
    case "ticket":
      return { icon: <MessageCircle size={15} />, label: "Support ticket", attribution: "— from a support ticket" };
    case "refund":
      return { icon: <IndianRupee size={15} />, label: "Refund", attribution: "— from a refund request" };
    default:
      return { icon: <CircleDollarSign size={15} />, label: "Customer signal", attribution: "— from customer feedback" };
  }
}

export function RawEventPanel({ event }: RawEventPanelProps) {
  const signal = getSignalLabel(event.triggerType);

  return (
    <div className="raw-event-panel">
      {/* Minimal Product-Context Single Line */}
      <div
        className="product-context-single-line type-body-sm"
        style={{
          fontWeight: 600,
          color: "var(--blinkit-near-black)",
          marginBottom: "12px",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--border-hairline)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span>
          {event.productName} · {event.category} · ₹{event.orderValue}
        </span>
        <span className="raw-event-badge type-body-sm">
          {signal.icon}
          <span>{signal.label}</span>
        </span>
      </div>

      <div className="raw-event-body">
        <p className="raw-event-label type-body-sm" style={{ fontWeight: 600, color: "var(--blinkit-near-black)", marginBottom: "8px" }}>
          Customer: <strong>{event.customerAlias}</strong> (Order #{event.orderId})
        </p>
        <blockquote className="customer-quote-box">
          <p className="customer-quote-text type-body">
            {event.rawText ? `"${event.rawText}"` : `"(No written feedback text provided — ${event.ratingValue ? `${event.ratingValue}-star rating logged` : "customer event registered"})"`}
          </p>
          <cite className="customer-quote-attribution type-body-sm">
            {signal.attribution}
          </cite>
        </blockquote>
      </div>
    </div>
  );
}

export default RawEventPanel;
