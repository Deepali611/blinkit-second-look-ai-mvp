import React from "react";
import { RotateCcw, Star, MessageCircle, IndianRupee, CircleDollarSign, Package } from "lucide-react";
import { EventListItem } from "@/lib/db/events";

export interface EventListTableProps {
  events: EventListItem[];
  onRowClick: (eventId: string) => void;
}

function getNoticeLabel(triggerType: string) {
  switch (triggerType?.toLowerCase()) {
    case "return":
      return { icon: <RotateCcw size={16} />, label: "Return" };
    case "rating":
      return { icon: <Star size={16} />, label: "Low rating" };
    case "ticket":
      return { icon: <MessageCircle size={16} />, label: "Support ticket" };
    case "refund":
      return { icon: <IndianRupee size={16} />, label: "Refund" };
    default:
      return { icon: <CircleDollarSign size={16} />, label: "Customer signal" };
  }
}

export function EventListTable({ events, onRowClick }: EventListTableProps) {
  if (!events || events.length === 0) {
    return (
      <div className="empty-events-container type-body">
        No customer recovery cases found for the selected filter.
      </div>
    );
  }

  return (
    <div className="event-list-wrapper">
      {/* Desktop Table (≥640px) */}
      <div className="desktop-table-view">
        <table className="event-table">
          <thead>
            <tr>
              <th className="type-body-sm">Customer</th>
              <th className="type-body-sm">Product & Order</th>
              <th className="type-body-sm">Category</th>
              <th className="type-body-sm">How we noticed</th>
              <th className="type-body-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => {
              const notice = getNoticeLabel(evt.triggerType);

              return (
                <tr
                  key={evt.eventId}
                  className="event-table-row"
                  onClick={() => onRowClick(evt.eventId)}
                >
                  <td className="type-body" style={{ fontWeight: 600 }}>{evt.customerAlias}</td>
                  <td className="type-body">
                    <div className="table-product-cell">
                      <div className="table-product-thumbnail">
                        <Package size={14} />
                      </div>
                      <div className="table-product-info">
                        <span className="table-product-name">{evt.productName}</span>
                        <span className="table-product-value">₹{evt.orderValue}</span>
                      </div>
                    </div>
                  </td>
                  <td className="type-body">{evt.category}</td>
                  <td className="type-body">
                    <div className="signal-type-badge">
                      {notice.icon}
                      <span className="trigger-type-label">{notice.label}</span>
                    </div>
                  </td>
                  <td className="type-body">{evt.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (<640px) */}
      <div className="mobile-cards-view">
        {events.map((evt) => {
          const notice = getNoticeLabel(evt.triggerType);

          return (
            <div
              key={evt.eventId}
              className="event-mobile-card"
              onClick={() => onRowClick(evt.eventId)}
            >
              <div className="card-row">
                <span className="card-label type-body-sm">Customer:</span>
                <span className="card-value type-body" style={{ fontWeight: 600 }}>{evt.customerAlias}</span>
              </div>
              <div className="card-row">
                <span className="card-label type-body-sm">Product:</span>
                <span className="card-value type-body">{evt.productName} (₹{evt.orderValue})</span>
              </div>
              <div className="card-row">
                <span className="card-label type-body-sm">Category:</span>
                <span className="card-value type-body">{evt.category}</span>
              </div>
              <div className="card-row">
                <span className="card-label type-body-sm">How we noticed:</span>
                <div className="signal-type-badge type-body">
                  {notice.icon}
                  <span className="trigger-type-label">{notice.label}</span>
                </div>
              </div>
              <div className="card-row">
                <span className="card-label type-body-sm">Date:</span>
                <span className="card-value type-body">{evt.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventListTable;
