import React from "react";
import { RotateCcw, Star, MessageCircle, IndianRupee, CircleDollarSign } from "lucide-react";
import { EventListItem } from "@/lib/db/events";

export interface EventListTableProps {
  events: EventListItem[];
  onRowClick: (eventId: string) => void;
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

export function EventListTable({ events, onRowClick }: EventListTableProps) {
  if (!events || events.length === 0) {
    return (
      <div className="empty-events-container type-body">
        No events found for the selected filter.
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
              <th className="type-body-sm">Category</th>
              <th className="type-body-sm">Signal Type</th>
              <th className="type-body-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr
                key={evt.eventId}
                className="event-table-row"
                onClick={() => onRowClick(evt.eventId)}
              >
                <td className="type-body">{evt.customerAlias}</td>
                <td className="type-body">{evt.category}</td>
                <td className="type-body">
                  <div className="signal-type-badge">
                    {getSignalIcon(evt.triggerType)}
                    <span className="trigger-type-label">{evt.triggerType}</span>
                  </div>
                </td>
                <td className="type-body">{evt.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (<640px) */}
      <div className="mobile-cards-view">
        {events.map((evt) => (
          <div
            key={evt.eventId}
            className="event-mobile-card"
            onClick={() => onRowClick(evt.eventId)}
          >
            <div className="card-row">
              <span className="card-label type-body-sm">Customer:</span>
              <span className="card-value type-body">{evt.customerAlias}</span>
            </div>
            <div className="card-row">
              <span className="card-label type-body-sm">Category:</span>
              <span className="card-value type-body">{evt.category}</span>
            </div>
            <div className="card-row">
              <span className="card-label type-body-sm">Signal Type:</span>
              <div className="signal-type-badge type-body">
                {getSignalIcon(evt.triggerType)}
                <span className="trigger-type-label">{evt.triggerType}</span>
              </div>
            </div>
            <div className="card-row">
              <span className="card-label type-body-sm">Date:</span>
              <span className="card-value type-body">{evt.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventListTable;
