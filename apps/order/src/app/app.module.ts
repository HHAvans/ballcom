import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from '@org/rabbitmq';
import { OrderPublisher } from './orderpublisher';

@Module({
  imports: [RabbitMqModule],
  controllers: [AppController],
  providers: [AppService, OrderPublisher],
})
export class AppModule {}
