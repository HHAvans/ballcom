export interface ShipmentCreatedEvent {
  shipmentId: string;
  orderId: string;
  carrier: string;
}

export interface OrderReleasedEvent {
  orderId: string;
  customerId: string;
  createdAt: string;
}

export interface SupplierProductProposedEvent {
  productId: string;
  productName: string;
  description: string;
  price: number;
}