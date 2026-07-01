import { Module } from '@nestjs/common';
import { RabbitMqModule } from '@org/rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentConsumer } from './payment.consumer';
import { WarehousePublisher } from './warehouse.publisher';

@Module({
  imports: [RabbitMqModule],
  controllers: [AppController],
  providers: [
    AppService,
    PaymentConsumer,
    WarehousePublisher,
  ],
})
export class AppModule {}