import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FulfilmentOrderEntity } from './fulfilment.entity';
import { WarehousePublisher } from './warehouse.publisher';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FulfilmentOrderEntity)
    private readonly repo: Repository<FulfilmentOrderEntity>,
    private readonly publisher: WarehousePublisher,
  ) {}

  async createFulfilmentOrder(orderId: string, products: string[]): Promise<FulfilmentOrderEntity> {
    const fulfilment = this.repo.create({ orderId, products, status: 'Wordt klaargemaakt voor verzending' });
    return await this.repo.save(fulfilment);
  }

  async findAll(): Promise<FulfilmentOrderEntity[]> {
    return await this.repo.find();
  }

  async packOrder(id: string) {
    const fulfilment = await this.repo.findOneBy({ id });
    if (!fulfilment) return { error: 'Niet gevonden' };

    fulfilment.status = 'verpakt';
    fulfilment.packedAt = new Date().toISOString();
    await this.repo.save(fulfilment);

    await this.publisher.parcelPacked({
      parcelId: crypto.randomUUID(),
      orderId: fulfilment.orderId,
      packedAt: fulfilment.packedAt,
    });

    return fulfilment;
  }
}