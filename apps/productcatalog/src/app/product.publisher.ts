import { Injectable } from "@nestjs/common";
import { RabbitPublisher } from "@org/rabbitmq";

@Injectable()
export class ProductPublisher extends RabbitPublisher {

  protected exchange = 'productcatalog.events';

  async productCreated(event: any) {
    await this.publish(
      'product.created',
      event,
    );
  }
  async productDeleted(event: any) {
    await this.publish(
      'product.deleted',
      event,
    );
  }
}