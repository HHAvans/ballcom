import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ShippingPublisher } from './shipping.publisher';

@Injectable()
export class ShippingService {
    
    constructor(
        private readonly publisher: ShippingPublisher,
    ) {}

  async createShipment(order: any) {

    console.log(
      'Creating shipment for',
      order.orderId,
    );

    const shipment = {
      shipmentId: randomUUID(),
      orderId: order.orderId,
      carrier: carrier,
      status: 'CREATED',
    };

    // submit to rabbitmq as event
    await this.publisher.shipmentCreated(shipment)
    
    console.log(shipment);
  }
}


// For now hardcoded... not sure how else to do it for the assignment
const carriers = [
    {
        name: 'PostNL',
        price: 6.25,
    },
    {
        name: 'DHL',
        price: 5.75,
    },
    {
        name: 'UPS',
        price: 7.10,
    },
];

const carrier = carriers.sort(
    (a, b) => a.price - b.price,
)[0];