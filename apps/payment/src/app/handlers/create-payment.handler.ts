import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreatePaymentCommand } from '../commands/create-payment.command';
import { PaymentCompletedEvent } from '../events/payment-completed.event';
import { PaymentEventEntity } from '../payment-event.entity';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand, string>
{
  constructor(
    @InjectRepository(
      PaymentEventEntity,
      'eventStore',
    )
    private readonly eventStore: Repository<PaymentEventEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreatePaymentCommand): Promise<string> {
    const paymentId = randomUUID();

    const domainEvent = new PaymentCompletedEvent(
      paymentId,
      command.orderId,
      command.customerId,
      command.amount,
      command.currency,
      'COMPLETED',
    );

    await this.eventStore.save(
      this.eventStore.create({
        aggregateId: paymentId,
        eventType: PaymentCompletedEvent.name,
        payload: {
          paymentId: domainEvent.paymentId,
          orderId: domainEvent.orderId,
          customerId: domainEvent.customerId,
          amount: domainEvent.amount,
          currency: domainEvent.currency,
          status: domainEvent.status,
        },
      }),
    );

    this.eventBus.publish(domainEvent);

    return paymentId;
  }
}
