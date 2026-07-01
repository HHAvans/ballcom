import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './app/supplier.module';

async function bootstrap() {
  const app = await NestFactory.create(SupplierModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
