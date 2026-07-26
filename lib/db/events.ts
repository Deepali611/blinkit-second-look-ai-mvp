import seedData from "@/data/seed.json";

export interface EventListItem {
  eventId: string;
  customerAlias: string;
  category: string;
  triggerType: string;
  date: string;
}

export interface EventDetail {
  eventId: string;
  orderId: string;
  triggerType: string;
  rawText: string;
  ratingValue: number | null;
  groundTruthFailureType: string;
  createdAt: string;
  customerAlias: string;
  category: string;
  orderValue: number;
}

export function getAllEvents(filterByFailureType?: string): EventListItem[] {
  const { failureEvents, orders, customers, categories } = seedData;

  const orderMap = new Map(orders.map((o) => [o.orderId, o]));
  const customerMap = new Map(customers.map((c) => [c.customerId, c]));
  const categoryMap = new Map(categories.map((cat) => [cat.categoryId, cat]));

  let filtered = failureEvents;
  if (filterByFailureType) {
    filtered = failureEvents.filter(
      (evt) => evt.groundTruthFailureType === filterByFailureType
    );
  }

  return filtered.map((evt) => {
    const order = orderMap.get(evt.orderId);
    const customer = order ? customerMap.get(order.customerId) : undefined;
    const category = order ? categoryMap.get(order.categoryId) : undefined;

    return {
      eventId: evt.eventId,
      customerAlias: customer ? customer.alias : "Unknown Customer",
      category: category ? category.name : "Unknown Category",
      triggerType: evt.triggerType,
      date: evt.createdAt,
    };
  });
}

export function getEventById(eventId: string): EventDetail | null {
  const { failureEvents, orders, customers, categories } = seedData;

  const event = failureEvents.find((evt) => evt.eventId === eventId);
  if (!event) return null;

  const order = orders.find((o) => o.orderId === event.orderId);
  const customer = order ? customers.find((c) => c.customerId === order.customerId) : undefined;
  const category = order ? categories.find((cat) => cat.categoryId === order.categoryId) : undefined;

  return {
    eventId: event.eventId,
    orderId: event.orderId,
    triggerType: event.triggerType,
    rawText: event.rawText,
    ratingValue: event.ratingValue,
    groundTruthFailureType: event.groundTruthFailureType,
    createdAt: event.createdAt,
    customerAlias: customer ? customer.alias : "Unknown Customer",
    category: category ? category.name : "Unknown Category",
    orderValue: order ? order.orderValue : 0,
  };
}
