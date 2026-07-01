import { Injectable } from '@nestjs/common';
import { RabbitConsumer } from '@org/rabbitmq';
import { PaymentCompletedEvent } from '@org/models';
import { AppService } from './app.service';

@Injectable()
export class PaymentConsumer extends RabbitConsumer {
  protected exchange = 'payment.events';
  protected queue = 'warehouse.payments';
  protected routingKey = 'payment.completed';

  constructor(
    channel: any,
    private readonly appService: AppService,
  ) {
    super(channel);
    console.log('--- WAREHOUSE PAYMENT CONSUMER STARTED ---');
  }

  protected async handle(event: PaymentCompletedEvent) {
    console.log('Warehouse received payment:', event);
    
    // Alleen verwerken als de betaling succesvol is afgerond
    if (event.status === 'COMPLETED') {
      // Pragmatische picklijst vulling aangezien de order-events geen producten bevatten
      const mockItems = ['CatalogProduct: Snelkoker XL', 'CatalogProduct: Ball.com Voetbal'];
      
      this.appService.createFulfilmentOrder(
        event.orderId, 
        mockItems
      );
    }
  }
}