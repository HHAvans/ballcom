import { Injectable } from '@nestjs/common';
import {
  SupplierProductDeletedEvent,
} from '@org/models';

import { RabbitConsumer } from '@org/rabbitmq';
import { ProductCatalogService } from './productcatalog.service';

@Injectable()
export class SupplierDeleteConsumer extends RabbitConsumer {

  protected exchange = 'supplier.events';
  protected queue = 'productcatalog.product-deletions';
  protected routingKey = 'supplier.product.deleted';

  constructor(
    channel: any,
    private readonly productCatalog: ProductCatalogService,
  ) {
    super(channel);
  }

  protected async handle(event: SupplierProductDeletedEvent) {
    await this.productCatalog.deleteProduct(event);
  }
  
}
