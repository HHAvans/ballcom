import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Channel } from 'amqplib';
import { ShippingService } from './shipping.service';

@Injectable()
export class OrderReleasedConsumer implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_CONNECTION')
    private readonly channel: Channel,
    private readonly shippingService: ShippingService,
  ) {}

  async onModuleInit() {
    await this.channel.assertExchange('order.events', 'topic', {
      durable: true,
    });

    const q = await this.channel.assertQueue('shipping.order.released', {
      durable: true,
    });

    await this.channel.bindQueue(q.queue, 'order.events', 'order.released');

    this.channel.consume(q.queue, async (msg) => {
      if (!msg) return;

      const event = JSON.parse(msg.content.toString());

      await this.shippingService.createShipment(event);

      this.channel.ack(msg);
    });
  }
}