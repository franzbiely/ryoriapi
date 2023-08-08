import { Branch } from 'src/general/branch/branch.entity';
import { Users } from 'src/general/user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RawGrocery } from '../rawGrocery/rawInventory.entity';

@Entity({ name: 'inventory_logs' })
export class InventoryLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column()
  branchId: number;

  @ManyToOne(() => Users, (user) => user.inventoryLogs, { onDelete: 'CASCADE' })
  user: Users;

  @ManyToOne(() => RawGrocery, (rawGrocery) => rawGrocery.inventoryLogs, {
    onDelete: 'CASCADE',
  })
  rawGrocery: RawGrocery;

  @ManyToOne(() => Branch, (branch) => branch.inventoryLogs, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @CreateDateColumn()
  createdAt: Date;
}
