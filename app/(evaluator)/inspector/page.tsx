"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { FilterChipRow, FilterOption } from "@/components/evaluator/FilterChipRow";
import { EventListTable } from "@/components/evaluator/EventListTable";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EventListItem } from "@/lib/db/events";

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All", value: "" },
  { label: "Quality/Authenticity", value: "expiry_authenticity" },
  { label: "Missing Info", value: "missing_information" },
  { label: "Unresolved Support", value: "unresolved_support" },
  { label: "High-Value Hesitation", value: "high_value_hesitation" },
  { label: "Edge Cases", value: "unclear" },
];

export default function WorkflowInspectorPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (failureType: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = failureType
        ? `/api/events?failureType=${encodeURIComponent(failureType)}`
        : "/api/events";

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to load events");
      }

      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to load events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(selectedFilter);
  }, [selectedFilter, fetchEvents]);

  const handleRowClick = (eventId: string) => {
    router.push(`/inspector/${eventId}`);
  };

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <main className="portal-container">
        <h1 className="type-display page-header-title">Workflow Inspector</h1>
        <ScopeBanner compact={true} />

        <FilterChipRow
          options={FILTER_OPTIONS}
          selectedValue={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {isLoading ? (
          <LoadingState message="Fetching failure events..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => fetchEvents(selectedFilter)}
          />
        ) : (
          <EventListTable events={events} onRowClick={handleRowClick} />
        )}
      </main>
    </div>
  );
}
