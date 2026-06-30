import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_events')
export class PaymentEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  aggregateId!: string;

  @Column()
  eventType!: string;

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  occurredAt!: Date;
}
