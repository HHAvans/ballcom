import { Injectable } from '@nestjs/common';
import {
  SupplierProductProposedEvent,
} from '@org/models';

import { RabbitConsumer } from '@org/rabbitmq';
import { ProductCatalogService } from './productcatalog.service';

@Injectable()
export class SupplierConsumer extends RabbitConsumer {

  protected exchange = 'supplier.events';
  protected queue = 'productcatalog.products';
  protected routingKey = 'supplier.product.proposed';

  constructor(
    channel: any,
    private readonly productCatalog: ProductCatalogService,
  ) {
    super(channel);
  }

  protected async handle(event: SupplierProductProposedEvent) {
    await this.productCatalog.createProduct(event);
  }
}
