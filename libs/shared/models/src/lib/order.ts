import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from './order-item';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerId!: string;

  @Column({
    default: 'PENDING',
  })
  status!: string;

  @OneToMany(
    () => OrderItem,
    item => item.order,
    {
      cascade: true,
      eager: true,
    },
  )
  items!: OrderItem[];
}