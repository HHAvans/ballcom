import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from '@org/models';

@Controller("order")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const order = await this.appService.create(dto);
    return order;
  }

  @Get()
  async findAllOrder() {
    return this.appService.findAll();
  }
}
