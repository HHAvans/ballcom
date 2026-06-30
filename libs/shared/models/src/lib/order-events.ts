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
  supplierId: string;
  productName: string;
  description: string;
  price: number;
}

export interface SupplierProductDeletedEvent {
  productId: string;
  supplierId: string;
}