import { Module } from "@nestjs/common";
import * as amqp from 'amqplib'

@Module({
  providers: [
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: async () => {
        while (true) {
          try {
            const conn = await amqp.connect(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              process.env['RABBITMQ_URL']!,
            );
            return conn.createChannel();
          } catch {
            console.log('RabbitMQ not ready, retrying in 5s...');
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      },
    },
  ],
  exports: ['RABBITMQ_CONNECTION'],
})
export class RabbitMqModule {}