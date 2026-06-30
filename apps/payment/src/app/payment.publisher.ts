import { Injectable } from "@nestjs/common";
import { RabbitPublisher } from "@org/rabbitmq";

@Injectable()
export class PaymentPublisher extends RabbitPublisher {

  protected exchange = 'payment.events';

  async paymentCompleted(event: any) {
    await this.publish(
      'payment.completed',
      event,
    );
  }
}
