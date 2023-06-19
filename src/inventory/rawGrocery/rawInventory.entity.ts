import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'raw_inventory_grocery' })
export class RawGrocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  weight: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
