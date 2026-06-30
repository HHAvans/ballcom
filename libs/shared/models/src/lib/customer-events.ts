// Customer & Access context — gepubliceerde events (exchange: customer.events).

export interface CustomerRegisteredEvent {
  customerId: string;
  name: string;
  email: string;
}

export interface CustomerAddressChangedEvent {
  customerId: string;
  address: string;
}

export interface CustomerProfileImportedEvent {
  customerId: string;
  name: string;
  address: string;
  source: string;
}
