import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type SupplierStatus = 'pending' | 'approved';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  supplierId!: string;

  @Column()
  name!: string;

  @Column({ default: 'pending' })
  status!: SupplierStatus;
}
