export interface ShipmentCreatedEvent {
  shipmentId: string;
  orderId: string;
  carrier: string;
}

export interface OrderReleasedEvent {
  orderId: string;
  products: [Product];
  customerId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  productId: string
  quantity: number
  price: number
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

export interface PaymentCompletedEvent {
  paymentId: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface ParcelPackedEvent {
  parcelId: string;
  orderId: string;
  packedAt: string;
}