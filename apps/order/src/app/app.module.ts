import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from '@org/rabbitmq';
import { OrderPublisher } from './orderpublisher';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from '@org/models';

@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'orderdb',
      entities: [Order, OrderItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [AppController],
  providers: [AppService, OrderPublisher],
})
export class AppModule {}
