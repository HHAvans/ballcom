import { Injectable } from '@nestjs/common';
import { RabbitConsumer } from '@org/rabbitmq';
import { PaymentCompletedEvent } from '@org/models';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentConsumer extends RabbitConsumer {
  protected exchange = 'payment.events';
  protected queue = 'warehouse.payments';
  protected routingKey = 'payment.completed';

  constructor(
    channel: any,
    private readonly appService: AppService,
    private readonly http: HttpService,
  ) {
    super(channel);
    console.log('--- WAREHOUSE PAYMENT CONSUMER STARTED ---');
  }

  protected async handle(event: PaymentCompletedEvent) {
    console.log('Warehouse received payment:', event);
    
    // Alleen verwerken als de betaling succesvol is afgerond
    if (event.status === 'COMPLETED') {
      
      const { data: order } = await firstValueFrom(
        this.http.get(`http://order:3001/api/order/${event.orderId}`),
      );

      await this.appService.createFulfilmentOrder(
        order.id,
        order.products,
      );
    }
  }
}