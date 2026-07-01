import { Injectable } from '@nestjs/common';
import { RabbitPublisher } from '@org/rabbitmq';
import { ParcelPackedEvent } from '@org/models';

@Injectable()
export class WarehousePublisher extends RabbitPublisher {
  protected readonly exchange = 'warehouse.events';

  async parcelPacked(event: ParcelPackedEvent) {
    await this.publish('parcel.packed', event);
  }
}