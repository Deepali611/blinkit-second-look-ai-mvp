import React from "react";
import { BlinkitProductPage } from "@/components/customer/BlinkitProductPage";

export default async function MockProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ eventId?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const productId = resolvedParams.productId;
  const eventId = resolvedSearchParams.eventId || "evt_1";

  // Check failure type from event or product
  let failureType = "expiry_authenticity";
  if (productId.includes("2") || productId.includes("personal_care")) {
    failureType = "missing_information";
  } else if (productId.includes("3") || productId.includes("pet_supplies")) {
    failureType = "unresolved_support";
  } else if (productId.includes("4")) {
    failureType = "high_value_hesitation";
  }

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#FFF",
        minHeight: "100vh",
      }}
    >
      <BlinkitProductPage
        emphasisVariant={failureType}
        failureType={failureType}
        categoryId={productId}
        hasResolvedCase={true}
        showAcknowledgmentToast={false}
      />
    </div>
  );
}
