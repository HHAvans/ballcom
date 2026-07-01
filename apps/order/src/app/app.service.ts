import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, Order } from '@org/models';
import { Repository } from 'typeorm';
import { OrderPublisher } from './orderpublisher'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly publisher: OrderPublisher,
  ) {}
  async create(dto: CreateOrderDto) {
    const order = this.orderRepository.create({
      customerId: dto.customerId,
      status: 'PENDING',
      products: dto.products,
    });
    
    await this.orderRepository.save(order)

    await this.publisher.orderReleased({
      orderId: order.id,
      customerId: dto.customerId,
      products: dto.products,
      createdAt: new Date().toISOString(),
    });
  }

  async findAll() {
    return this.orderRepository.find();
  }
}