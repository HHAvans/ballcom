import { Inject, Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';

@Injectable()
export class OrderPublisher {
  constructor(
    @Inject('RABBITMQ_CONNECTION')
    private readonly channel: Channel,
  ) {}

  async orderReleased(event: any) {
    await this.channel.publish(
      'order.events',
      'order.released',
      Buffer.from(JSON.stringify(event)),
    );
  }
}