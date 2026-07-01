import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  productId!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @ManyToOne(
    () => Order,
    order => order.products,
  )
  order!: Order;
}