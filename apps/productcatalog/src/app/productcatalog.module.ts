import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqModule } from '@org/rabbitmq';
import { Product } from './product.entity';
import { ProductCatalogService } from './productcatalog.service';
import { ProductPublisher } from './product.publisher';
import { SupplierConsumer } from './supplier.consumer';


@Module({
  imports: [
    RabbitMqModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'productdb',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    ProductCatalogService,
    ProductPublisher,
    SupplierConsumer,
  ],
})
export class ProductCatalogModule {}
