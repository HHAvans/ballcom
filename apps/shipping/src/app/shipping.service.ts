import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shipment } from '@org/models';
import { ShippingPublisher } from './shipping.publisher';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    private readonly publisher: ShippingPublisher,
  ) {}

  async createShipment(order: any) {
    console.log('Creating shipment for', order.orderId);

    const shipment = this.shipmentRepository.create({
      orderId: order.orderId,
      carrier: carrier.name,
      status: 'CREATED',
    });

    await this.shipmentRepository.save(shipment);

    await this.publisher.shipmentCreated({
      shipmentId: shipment.id,
      orderId: shipment.orderId,
      carrier: shipment.carrier,
      status: shipment.status,
    });

    return shipment;
  }

  async findAll() {
    return this.shipmentRepository.find();
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