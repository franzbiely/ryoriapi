import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from '../product/menuItem/menuItem.entity';

@Entity({ name: 'branch_item' })
export class BranchItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchItem: number;

  @ManyToMany(() => Branch, (branch) => branch.branchItem, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  branch: Branch[];

  @Column()
  menuItemId: number;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.branchItem, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  menuItem: MenuItem[];

  @CreateDateColumn()
  createdAt: Date;
}
