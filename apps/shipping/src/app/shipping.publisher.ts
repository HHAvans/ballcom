import { Injectable } from "@nestjs/common";
import { RabbitPublisher } from "@org/rabbitmq";

@Injectable()
export class ShippingPublisher extends RabbitPublisher {

  protected exchange = 'shipping.events';

  async shipmentCreated(event: any) {
    await this.publish(
      'shipment.created',
      event,
    );
  }
}