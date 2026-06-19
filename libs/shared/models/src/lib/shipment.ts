import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  status!: string;
}