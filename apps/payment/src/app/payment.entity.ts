import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId!: string;

  @Column()
  orderId!: string;

  @Column()
  customerId!: string;

  @Column({ type: 'float', default: 0 })
  amount!: number;

  @Column({ default: 'EUR' })
  currency!: string;

  @Column({ default: 'COMPLETED' })
  status!: string;
}
