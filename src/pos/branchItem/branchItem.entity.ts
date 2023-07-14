import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from '../product/menuItem/menuItem.entity';

@Entity({ name: 'branchitem' })
export class BranchItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  branchId: number;

  @Column()
  menuItemId: number;

  @ManyToOne(() => Branch, (branch) => branch.branchItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  branch: Branch;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.branchItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  menuItem: MenuItem;

  @CreateDateColumn()
  createdAt: Date;
}
