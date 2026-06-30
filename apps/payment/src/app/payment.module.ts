import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqModule } from '@org/rabbitmq';
import { AppController } from './payment.controller';
import { CreatePaymentHandler } from './handlers/create-payment.handler';
import { GetAllPaymentsHandler } from './handlers/get-all-payments.handler';
import { PaymentCompletedProjectionHandler } from './handlers/payment-completed.handler';
import { Payment } from './payment.entity';
import { PaymentEventEntity } from './payment-event.entity';
import { OrderConsumer } from './order.consumer';
import { PaymentPublisher } from './payment.publisher';

const commandHandlers = [CreatePaymentHandler];
const queryHandlers = [GetAllPaymentsHandler];
const eventHandlers = [PaymentCompletedProjectionHandler];

@Module({
  imports: [
    RabbitMqModule,
    CqrsModule,
    TypeOrmModule.forRoot({
      name: 'eventStore',
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database:
        process.env.PAYMENT_EVENT_DB_NAME ??
        process.env.DB_NAME ??
        'payment_events_db',
      entities: [PaymentEventEntity],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'readModel',
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database:
        process.env.PAYMENT_READ_DB_NAME ??
        process.env.DB_NAME ??
        'payment_read_db',
      entities: [Payment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [PaymentEventEntity],
      'eventStore',
    ),
    TypeOrmModule.forFeature([Payment], 'readModel'),
  ],
  controllers: [AppController],
  providers: [
    PaymentPublisher,
    OrderConsumer,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
  ],
})
export class PaymentModule {}
