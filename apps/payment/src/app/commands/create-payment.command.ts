export class CreatePaymentCommand {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly amount: number,
    public readonly currency: string,
  ) {}
}
