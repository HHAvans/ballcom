import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqModule } from '@org/rabbitmq';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerImportService } from './customer-import.service';
import { CustomerPublisher } from './customer.publisher';

@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'customerdb',
      entities: [CustomerProfile],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerProfile]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerImportService, CustomerPublisher],
})
export class CustomerModule {}
