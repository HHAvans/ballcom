import { Module } from '@nestjs/common';
import { RabbitMqModule } from '@org/rabbitmq';
import { ShippingService } from './shipping.service';
import { ShippingPublisher } from './shipping.publisher';
import { OrderConsumer } from './order.consumer';


@Module({
  imports: [
    RabbitMqModule,
  ],
  providers: [
    ShippingService,
    ShippingPublisher,
    OrderConsumer,
  ],
})
export class ShippingModule {}