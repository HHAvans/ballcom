import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerId!: string;

  @Column()
  status!: string;
}