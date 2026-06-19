import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@org/models';

@Injectable()
export class AppService {
  async create(dto: CreateOrderDto) {
    return {
      id: crypto.randomUUID(),
      ...dto,
    };
  }
}