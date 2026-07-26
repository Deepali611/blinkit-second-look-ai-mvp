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
  { label: "Item arrived damaged", value: "expiry_authenticity" },
  { label: "Couldn't tell if it was right for me", value: "missing_information" },
  { label: "Support never followed up", value: "unresolved_support" },
  { label: "Wasn't sure about the price", value: "high_value_hesitation" },
  { label: "System correctly held back", value: "unclear" },
];

export default function CustomerRecoveryCasesPage() {
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
      setError("Failed to load customer recovery cases. Please try again.");
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
        <h1 className="type-display page-header-title">Customer Recovery Cases</h1>
        <ScopeBanner compact={true} />

        <FilterChipRow
          options={FILTER_OPTIONS}
          selectedValue={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {isLoading ? (
          <LoadingState message="Reviewing customer cases..." />
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
