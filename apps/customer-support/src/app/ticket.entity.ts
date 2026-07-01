import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerId!: string;

  @Column()
  subject!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ default: 'open' })
  status!: string;

  @Column({ nullable: true })
  answer?: string;
}