import { Injectable } from '@nestjs/common';
import { RabbitPublisher } from '@org/rabbitmq';
import {
  SupplierApprovedEvent,
  SupplierProductProposedEvent,
  SupplierProductDeletedEvent,
} from '@org/models';

// Publiceert supplier-events naar RabbitMQ.
@Injectable()
export class SupplierPublisher extends RabbitPublisher {
  protected readonly exchange = 'supplier.events';

  async supplierApproved(event: SupplierApprovedEvent) {
    await this.publish('supplier.approved', event);
  }

  async productProposed(event: SupplierProductProposedEvent) {
    await this.publish('supplier.product.proposed', event);
  }

  async productDeleted(event: SupplierProductDeletedEvent) {
    await this.publish('supplier.product.deleted', event);
  }
}
