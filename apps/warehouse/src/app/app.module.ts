import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqModule } from '@org/rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentConsumer } from './payment.consumer';
import { WarehousePublisher } from './warehouse.publisher';
import { FulfilmentOrderEntity } from './fulfilment.entity';

@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'warehousedb',
      entities: [FulfilmentOrderEntity],
      synchronize: true, // Maakt automatisch de tabellen aan
    }),
    TypeOrmModule.forFeature([FulfilmentOrderEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, PaymentConsumer, WarehousePublisher],
})
export class AppModule {}