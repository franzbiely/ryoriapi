import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Users } from '../user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Transaction } from 'src/pos/transaction/transaction/transaction.entity';
import { RawGrocery } from 'src/inventory/rawGrocery/rawInventory.entity';
import { RawCategory } from 'src/inventory/rawCategory/rawCategory.entity';
import { BranchItem } from 'src/pos/branchItem/branchItem.entity';
import { TransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.entity';
import { InventoryLogs } from 'src/inventory/inventoryLogs/inventoryLogs.entity';

@Entity({ name: 'branch' })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branchName: string;

  @Column()
  email: string;

  @Column()
  contactNumber: string;

  @Column()
  address: string;

  @ManyToOne(() => Store, (store) => store.branch, { onDelete: 'CASCADE' })
  @JoinColumn()
  store: Store;

  @Column()
  storeId: number;

  @ManyToMany(() => Users, (user) => user.branch, { onDelete: 'CASCADE' })
  user: Users[];

  @OneToMany(() => Transaction, (transaction) => transaction.branch, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction[];

  @OneToMany(() => RawGrocery, (rawGrocery) => rawGrocery.branch, {
    onDelete: 'CASCADE',
  })
  rawGrocery: RawGrocery[];

  @OneToMany(() => BranchItem, (quantity) => quantity.branch, {
    onDelete: 'CASCADE',
  })
  branchItem: BranchItem[];

  @OneToMany(() => RawCategory, (rawCategory) => rawCategory.branch, {
    onDelete: 'CASCADE',
  })
  rawCategory: RawCategory[];

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.branch,
    {
      onDelete: 'CASCADE',
    },
  )
  transactionItem: TransactionItem[];

  @OneToMany(() => InventoryLogs, (inventoryLogs) => inventoryLogs.branch, {
    onDelete: 'CASCADE',
  })
  inventoryLogs: InventoryLogs[];

  @CreateDateColumn()
  createdAt: Date;
}
