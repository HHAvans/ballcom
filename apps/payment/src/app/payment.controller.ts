import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePaymentCommand } from './commands/create-payment.command';
import { GetAllPaymentsQuery } from './queries/get-all-payments.query';

@Controller('payments')
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  getAllPayments() {
    return this.queryBus.execute(new GetAllPaymentsQuery());
  }
}
