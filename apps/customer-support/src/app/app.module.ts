import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketEntity } from './ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'supportdb',
      entities: [TicketEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TicketEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}