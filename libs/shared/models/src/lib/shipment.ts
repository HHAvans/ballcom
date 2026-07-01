import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  carrier!: string;

  @Column()
  status!: string;
}