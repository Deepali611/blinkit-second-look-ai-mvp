import seedData from "@/data/seed.json";

export interface SellerConsistencyData {
  verifiedOrderCount: number;
  qualityComplaintCount: number;
  daysWithoutComplaint: number;
}

export interface EventListItem {
  eventId: string;
  customerAlias: string;
  category: string;
  productName: string;
  orderValue: number;
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
  productName: string;
  orderValue: number;
  reorderRate?: number;
  returnRate?: number;
  sellerConsistency?: SellerConsistencyData;
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
      productName: evt.productName || (order ? order.productName : "Blinkit Item"),
      orderValue: order ? order.orderValue : 0,
      triggerType: evt.triggerType,
      date: evt.createdAt,
    };
  });
}

export function getEventById(eventId: string): EventDetail | null {
  const { failureEvents, orders, customers, categories, products } = seedData;

  const event = failureEvents.find((evt) => evt.eventId === eventId);
  if (!event) return null;

  const order = orders.find((o) => o.orderId === event.orderId);
  const customer = order ? customers.find((c) => c.customerId === order.customerId) : undefined;
  const category = order ? categories.find((cat) => cat.categoryId === order.categoryId) : undefined;
  const product = products.find((p) => p.name === event.productName || p.productId === order?.productName);

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
    productName: event.productName || (order ? order.productName : "Blinkit Item"),
    orderValue: order ? order.orderValue : 0,
    reorderRate: product?.reorderRate ?? order?.reorderRate,
    returnRate: product?.returnRate ?? order?.returnRate,
    sellerConsistency: product?.sellerConsistency ?? order?.sellerConsistency,
  };
}
