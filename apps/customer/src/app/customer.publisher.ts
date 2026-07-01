import { Injectable } from '@nestjs/common';
import { RabbitPublisher } from '@org/rabbitmq';
import {
  CustomerRegisteredEvent,
  CustomerAddressChangedEvent,
  CustomerProfileImportedEvent,
} from '@org/models';

// Publiceert customer-events naar RabbitMQ.
@Injectable()
export class CustomerPublisher extends RabbitPublisher {
  protected readonly exchange = 'customer.events';

  async customerRegistered(event: CustomerRegisteredEvent) {
    await this.publish('customer.registered', event);
  }

  async customerAddressChanged(event: CustomerAddressChangedEvent) {
    await this.publish('customer.address.changed', event);
  }

  async customerProfileImported(event: CustomerProfileImportedEvent) {
    await this.publish('customer.profile.imported', event);
  }
}
