import { Inject, Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';

@Injectable()
export abstract class RabbitPublisher {
  constructor(
    @Inject('RABBITMQ_CONNECTION')
    protected readonly channel: Channel,
  ) {}

  /**
   * Exchange this publisher publishes to.
   */
  protected abstract readonly exchange: string;

  protected async publish<T>(
    routingKey: string,
    payload: T,
  ): Promise<void> {
    await this.channel.assertExchange(
      this.exchange,
      'topic',
      {
        durable: true,
      },
    );

    this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
    );
  }
}