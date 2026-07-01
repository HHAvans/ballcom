import { Injectable } from '@nestjs/common';
import {
  ParcelPackedEvent,
} from '@org/models';

import { RabbitConsumer } from '@org/rabbitmq';
import { ShippingService } from './shipping.service';

@Injectable()
export class WarehouseConsumer extends RabbitConsumer {
  protected exchange = 'warehouse.events';
  protected queue = 'shipping.orders';
  protected routingKey = 'parcel.packed';

  constructor(
    channel: any,
    private readonly shipping: ShippingService,
  ) {
    super(channel);
  }

  protected async handle(
    event: ParcelPackedEvent,
  ) {
    console.log("Parcel packed event received and creating shipment")
    await this.shipping.createShipment(event);
  }
}