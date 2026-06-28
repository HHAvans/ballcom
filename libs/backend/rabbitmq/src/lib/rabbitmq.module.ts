import { Module } from "@nestjs/common";
import * as amqp from 'amqplib'

// This class handles the connection with the rabbitmq service. Retries every 5s because sometimes when a rabbitmq start up and the service that uses it is tries to connect it fails because rabbitmq is somehow not ready yet.
// This will just keep looping until a connection is found, in which case the created channel is given to the classes (consumer and publisher)
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