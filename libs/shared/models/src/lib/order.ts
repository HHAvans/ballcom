import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItem } from './order-item';

@Entity('order')
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
    product => product.order,
    {
      cascade: true,
      eager: true,
    },
  )
  products!: OrderItem[];
}