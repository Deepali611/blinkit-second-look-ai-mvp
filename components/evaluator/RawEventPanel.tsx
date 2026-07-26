import React from "react";
import { RotateCcw, Star, MessageCircle, IndianRupee, CircleDollarSign, Package } from "lucide-react";
import { EventDetail } from "@/lib/db/events";

export interface RawEventPanelProps {
  event: EventDetail;
}

function getSignalLabel(triggerType: string) {
  switch (triggerType?.toLowerCase()) {
    case "return":
      return { icon: <RotateCcw size={16} />, label: "Return", attribution: "— from a return note" };
    case "rating":
      return { icon: <Star size={16} />, label: "Low rating", attribution: "— from a rating" };
    case "ticket":
      return { icon: <MessageCircle size={16} />, label: "Support ticket", attribution: "— from a support ticket" };
    case "refund":
      return { icon: <IndianRupee size={16} />, label: "Refund", attribution: "— from a refund request" };
    default:
      return { icon: <CircleDollarSign size={16} />, label: "Customer signal", attribution: "— from customer feedback" };
  }
}

export function RawEventPanel({ event }: RawEventPanelProps) {
  const signal = getSignalLabel(event.triggerType);

  return (
    <div className="raw-event-panel">
      <div className="raw-event-product-header">
        <div className="product-context-badge">
          <Package size={20} className="product-context-icon" />
          <div className="product-context-info">
            <h3 className="type-h1 product-title">{event.productName}</h3>
            <span className="type-body-sm product-meta">
              Order #{event.orderId} • {event.category} • ₹{event.orderValue}
            </span>
          </div>
        </div>

        <div className="customer-meta-chip">
          <span className="type-body-sm customer-name">Customer: <strong>{event.customerAlias}</strong></span>
          <span className="raw-event-badge type-body-sm">
            {signal.icon}
            <span>{signal.label}</span>
          </span>
        </div>
      </div>

      <div className="raw-event-body">
        <p className="raw-event-label type-body-sm" style={{ fontWeight: 600, color: "var(--blinkit-near-black)", marginBottom: "8px" }}>
          Customer Statement:
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
