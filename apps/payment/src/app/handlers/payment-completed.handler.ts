import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentCompletedEvent } from '../events/payment-completed.event';
import { Payment } from '../payment.entity';
import { PaymentPublisher } from '../payment.publisher';

@EventsHandler(PaymentCompletedEvent)
export class PaymentCompletedProjectionHandler
  implements IEventHandler<PaymentCompletedEvent>
{
  constructor(
    @InjectRepository(Payment, 'readModel')
    private readonly paymentRepository: Repository<Payment>,
    private readonly publisher: PaymentPublisher,
  ) {}

  async handle(event: PaymentCompletedEvent): Promise<void> {
    const payment = this.paymentRepository.create({
      paymentId: event.paymentId,
      orderId: event.orderId,
      customerId: event.customerId,
      amount: event.amount,
      currency: event.currency,
      status: event.status,
    });

    await this.paymentRepository.save(payment);
    await this.publisher.paymentCompleted(payment);
  }
}
