import { Module } from "@nestjs/common";
import * as amqp from 'amqplib'
import { OrderPublisher } from "./order-publisher";

@Module({
  providers: [
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: async () => {
        const conn = await amqp.connect(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          process.env['RABBITMQ_URL']!,
        );

        const channel = await conn.createChannel();

        return channel;
      },
    },
  ],
  exports: ['RABBITMQ_CONNECTION', OrderPublisher],
})
export class RabbitMqModule {}