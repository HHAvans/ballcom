import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from '@org/models';
import { OrderPublisher } from './orderpublisher'

@Controller("order")
export class AppController {
  constructor(private readonly appService: AppService, private readonly publisher: OrderPublisher) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const order = await this.appService.create(dto);

    await this.publisher.orderReleased({
      orderId: order.id,
      customerId: dto.customerId,
      amount: dto.amount ?? 0,
      createdAt: new Date().toISOString(),
    });

    return order;
  }
}
