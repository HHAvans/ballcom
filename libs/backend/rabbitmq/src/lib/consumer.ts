import { Inject, OnModuleInit } from '@nestjs/common';
import { Channel, ConsumeMessage } from 'amqplib';

// Used to receive messages in the service which get send by the publisher by another microservice. Listens for a "topic" (AKA the routingkey)
export abstract class RabbitConsumer
  implements OnModuleInit
{
  constructor(
    @Inject('RABBITMQ_CONNECTION')
    protected readonly channel: Channel,
  ) {}

  protected abstract exchange: string;
  protected abstract queue: string;
  protected abstract routingKey: string;

  protected abstract handle(
    message: unknown,
  ): Promise<void>;

  async onModuleInit() {
    await this.channel.assertExchange(
      this.exchange,
      'topic',
      { durable: true },
    );

    await this.channel.assertQueue(
      this.queue,
      { durable: true },
    );

    await this.channel.bindQueue(
      this.queue,
      this.exchange,
      this.routingKey,
    );

    this.channel.consume(
      this.queue,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return;

        const payload = JSON.parse(
          msg.content.toString(),
        );

        await this.handle(payload);

        this.channel.ack(msg);
      },
    );
  }
}