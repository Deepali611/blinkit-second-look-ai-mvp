import seedData from "@/data/seed.json";
import { getEventById } from "@/lib/db/events";

export interface CTAResult {
  ctaLabel: string;
  ctaDestination: string;
}

export function selectCTA(failureType: string, eventId: string): CTAResult {
  const event = getEventById(eventId);
  const orderId = event?.orderId || "ord_1";
  let categoryId = "cat_electronics";

  const order = seedData.orders.find((o) => o.orderId === orderId);
  if (order) {
    categoryId = order.categoryId;
  }

  switch (failureType) {
    case "expiry_authenticity":
      return {
        ctaLabel: "See this product now",
        ctaDestination: `/mock/product/${orderId}`,
      };
    case "missing_information":
      return {
        ctaLabel: "See what others found",
        ctaDestination: `/mock/product/${orderId}?anchor=reviews`,
      };
    case "unresolved_support":
      return {
        ctaLabel: "See category again",
        ctaDestination: `/mock/category/${categoryId}`,
      };
    case "high_value_hesitation":
      return {
        ctaLabel: "See eligible items",
        ctaDestination: `/mock/category/${categoryId}?filter=returns_eligible`,
      };
    default:
      return {
        ctaLabel: "View details",
        ctaDestination: `/mock/order/${orderId}`,
      };
  }
}
