import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fulfilment_orders')
export class FulfilmentOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @Column({ default: 'Wordt klaargemaakt voor verzending' })
  status!: string;

  @Column('simple-array')
  products!: string[];

  @Column({ nullable: true })
  packedAt?: string;
}