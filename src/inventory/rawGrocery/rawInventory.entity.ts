import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RawCategory } from '../rawCategory/rawCategory.entity';

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

  @Column()
  branchId: number;

  @ManyToOne(() => Branch, (branch) => branch.rawGrocery, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @ManyToMany(() => RawCategory, (rawCategory) => rawCategory.rawGrocery, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  rawCategory: RawCategory[];

  @CreateDateColumn()
  createdAt: Date;
}
