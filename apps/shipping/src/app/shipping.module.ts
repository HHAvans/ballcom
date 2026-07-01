import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMqModule } from '@org/rabbitmq';

import { Shipment } from '@org/models';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { ShippingPublisher } from './shipping.publisher';
import { WarehouseConsumer } from './warehouse.consumer';

@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'shippingdb',
      entities: [Shipment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Shipment]),
  ],
  controllers: [ShippingController],
  providers: [
    ShippingService,
    ShippingPublisher,
    WarehouseConsumer,
  ],
})
export class ShippingModule {}