import { Column, Entity, PrimaryColumn } from 'typeorm';

// Voorgestelde producten, zodat we ze later kunnen verwijderen.
@Entity('supplier_products')
export class SupplierProduct {
  @PrimaryColumn('uuid')
  productId!: string;

  @Column()
  supplierId!: string;

  @Column()
  productName!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'float' })
  price!: number;
}
