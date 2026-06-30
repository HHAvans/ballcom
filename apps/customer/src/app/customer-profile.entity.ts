import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('customer_profiles')
export class CustomerProfile {
  @PrimaryColumn('uuid')
  customerId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string;

  // sleutel uit het bronbestand, voorkomt dubbele import
  @Column({ unique: true, nullable: true })
  externalRef?: string;

  @Column({ default: 'manual' })
  source!: string;
}
