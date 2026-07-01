import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  OrderReleasedEvent,
} from '@org/models';

import { RabbitConsumer } from '@org/rabbitmq';
import { CreatePaymentCommand } from './commands/create-payment.command';

@Injectable()
export class OrderConsumer extends RabbitConsumer {
  protected exchange = 'order.events';
  protected queue = 'payment.orders';
  protected routingKey = 'order.released';

  constructor(
    channel: any,
    private readonly commandBus: CommandBus,
  ) {
    super(channel);
  }

  protected async handle(
    event: OrderReleasedEvent,
  ) {

    // get total amount as total of all products of an order price total
    let totalSum = 0
    for (const product of event.products) {
      totalSum += product.quantity * product.price
    }

    await this.commandBus.execute(
      new CreatePaymentCommand(
        event.orderId,
        event.customerId,
        totalSum,
        'EUR',
      ),
    );
  }
}