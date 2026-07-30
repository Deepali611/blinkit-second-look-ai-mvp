"use client";

import React from "react";
import { Database, AlertCircle } from "lucide-react";

export interface VerificationRecordDetailProps {
  data: Record<string, unknown> | null;
  sourceChecked: string;
  verificationStatus: string;
  failureType?: string;
}

export function VerificationRecordDetail({
  data,
  sourceChecked,
  verificationStatus,
  failureType,
}: VerificationRecordDetailProps) {
  if (verificationStatus === "unverifiable" || !data) {
    return (
      <div
        className="verification-record-detail"
        style={{
          marginTop: "12px",
          padding: "10px 14px",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <AlertCircle size={14} style={{ color: "var(--warning-unverified, #D97706)" }} />
        <span>No record found in <code>{sourceChecked}</code></span>
      </div>
    );
  }

  // Render specific fields per failure type
  const renderFields = () => {
    switch (failureType) {
      case "expiry_authenticity":
        return (
          <>
            <div><strong>Vendor ID:</strong> <code>{String(data.vendorId || "N/A")}</code></div>
            <div><strong>Compliance Status:</strong> <code>{String(data.status || "N/A")}</code></div>
            <div><strong>Last Checked Date:</strong> {String(data.lastCheckedDate || "N/A")}</div>
          </>
        );
      case "missing_information":
        return (
          <>
            <div><strong>Review Count:</strong> {String(data.reviewCount ?? "N/A")} reviews</div>
            <div><strong>Populated After Date:</strong> {String(data.populatedAfterDate || "N/A")}</div>
          </>
        );
      case "unresolved_support":
        return (
          <>
            <div><strong>Ticket Status:</strong> <code>{String(data.ticketStatus || "N/A")}</code></div>
            <div><strong>Resolved Date:</strong> {String(data.resolvedDate || "N/A")}</div>
            {data.resolutionNote && (
              <div><strong>Resolution Note:</strong> {String(data.resolutionNote)}</div>
            )}
          </>
        );
      case "high_value_hesitation":
        return (
          <>
            <div><strong>Return Policy Days:</strong> {String(data.policyDays ?? "N/A")} days</div>
            {data.policySummary && (
              <div><strong>Policy Summary:</strong> {String(data.policySummary)}</div>
            )}
          </>
        );
      default:
        return (
          <pre style={{ margin: 0, fontSize: "11px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div
      className="verification-record-detail"
      style={{
        marginTop: "12px",
        padding: "12px 14px",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(84, 178, 38, 0.3)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "var(--blinkit-white, #FFFFFF)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--blinkit-green, #54B226)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "2px",
        }}
      >
        <Database size={13} />
        <span>Operational Record Details ({sourceChecked})</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", opacity: 0.9 }}>
        {renderFields()}
      </div>
    </div>
  );
}

export default VerificationRecordDetail;
