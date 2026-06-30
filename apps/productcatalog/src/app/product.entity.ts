import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn('uuid')
  productId!: string;

  @Column()
  supplierId!: string;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'float' })
  price!: number;
}
