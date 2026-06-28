import { Inject, Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';

// This abstract class is for creating publishing events for communicating with the rabbitmq service.
// To use this service, create a class that extends the RabbitPublisher and create methods that each call the publish method with the routingkey as the "topic" and the payload the data you want to send.

// Use the RabbitConsumer class also in this library to receive these messasges

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