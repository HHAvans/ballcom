import { Injectable } from '@nestjs/common';
import { RabbitPublisher } from '@org/rabbitmq';

@Injectable()
export class OrderPublisher extends RabbitPublisher {
  protected readonly exchange = 'order.events';

  async orderReleased(event: any) {
    await this.publish('order.released', event);
  }
}