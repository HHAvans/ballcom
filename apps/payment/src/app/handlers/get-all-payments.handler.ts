import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { GetAllPaymentsQuery } from '../queries/get-all-payments.query';

@QueryHandler(GetAllPaymentsQuery)
export class GetAllPaymentsHandler
  implements IQueryHandler<GetAllPaymentsQuery, Payment[]>
{
  constructor(
    @InjectRepository(Payment, 'readModel')
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }
}
