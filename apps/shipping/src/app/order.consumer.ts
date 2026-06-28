import { Injectable } from '@nestjs/common';
import {
  OrderReleasedEvent,
} from '@org/models';

import { RabbitConsumer } from '@org/rabbitmq';
import { ShippingService } from './shipping.service';

@Injectable()
export class OrderConsumer extends RabbitConsumer {
  protected exchange = 'order.events';
  protected queue = 'shipping.orders';
  protected routingKey = 'order.released';

  constructor(
    channel: any,
    private readonly shipping: ShippingService,
  ) {

    console.log("consumer constructed");
    console.log("shipping =", shipping);
    super(channel);
  }

  protected async handle(
    event: OrderReleasedEvent,
  ) {
    console.log(this.shipping)
    await this.shipping.createShipment(event);
  }
}