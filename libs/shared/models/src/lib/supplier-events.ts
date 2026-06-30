// Supplier Management context — gepubliceerde events (exchange: supplier.events).
// SupplierProductProposedEvent en SupplierProductDeletedEvent staan in order-events.ts
// (door Product Catalog toegevoegd) en worden daar geïmporteerd; hier alleen het approve-event.

export interface SupplierApprovedEvent {
  supplierId: string;
  name: string;
  approvedAt: string;
}
