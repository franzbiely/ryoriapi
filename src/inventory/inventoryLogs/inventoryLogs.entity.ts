/* eslint-disable prettier/prettier */

import { Branch } from 'src/general/branch/branch.entity';
import { Users } from 'src/general/user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'inventory_logs' })
export class InventoryLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  qtyReady: number;

  @Column()
  branchId: number;

  @ManyToOne(() => Users, (user) => user.inventoryLogs, { onDelete: 'CASCADE' })
  user: Users;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.inventoryLogs, {
    onDelete: 'CASCADE',
  })
  menuItem: MenuItem;

  @ManyToOne(() => Branch, (branch) => branch.inventoryLogs, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @CreateDateColumn()
  createdAt: Date;
}
