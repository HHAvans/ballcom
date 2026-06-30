import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqModule } from '@org/rabbitmq';
import { Supplier } from './supplier.entity';
import { SupplierProduct } from './supplier-product.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { SupplierPublisher } from './supplier.publisher';

@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'supplierdb',
      entities: [Supplier, SupplierProduct],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Supplier, SupplierProduct]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierPublisher],
})
export class SupplierModule {}
