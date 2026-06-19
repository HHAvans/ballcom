import { Injectable, Logger } from '@nestjs/common';

type OrderReleasedEvent = {
  orderId: string;
  customerId: string;
  createdAt: string;
};

@Injectable()
export class ShippingService {
  private readonly logger = new Logger(ShippingService.name);

  async createShipment(event: OrderReleasedEvent) {
    // 1. Validate input (basic safety)
    if (!event?.orderId || !event?.customerId) {
      throw new Error('Invalid order released event');
    }

    // 2. Simulate shipment creation (replace with DB later)
    const shipment = {
      id: crypto.randomUUID(),
      orderId: event.orderId,
      customerId: event.customerId,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
    };

    // 3. Log it (so you can see it working)
    this.logger.log(
      `Shipment created for order ${event.orderId}`,
    );

    this.logger.debug(JSON.stringify(shipment));

    // 4. TODO: persist to DB if needed
    return shipment;
  }
}