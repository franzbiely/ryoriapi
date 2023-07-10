import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Users } from '../user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Transaction } from 'src/pos/transaction/transaction/transaction.entity';
import { RawGrocery } from 'src/inventory/rawGrocery/rawInventory.entity';
import { RawCategory } from 'src/inventory/rawCategory/rawCategory.entity';

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

  @OneToMany(() => RawCategory, (rawCategory) => rawCategory.branch, {
    onDelete: 'CASCADE',
  })
  rawCategory: RawCategory[];

  @CreateDateColumn()
  createdAt: Date;
}
