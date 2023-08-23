import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RawGrocery } from '../rawGrocery/rawInventory.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Entity({ name: 'raw_category' })
export class RawCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  branchId: number;

  @Column()
  rawGrocery?: RawGrocery[];

  @ManyToOne(() => Branch, (branch) => branch.rawCategory, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @CreateDateColumn()
  createdAt: Date;
}
