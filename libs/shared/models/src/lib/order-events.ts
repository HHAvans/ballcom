export interface OrderReleasedEvent {
  orderId: string;
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  createdAt: string;
}

export interface ShipmentCreatedEvent {
  shipmentId: string;
  orderId: string;
  carrier: string;
}