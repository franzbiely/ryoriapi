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
import { Transaction } from '../transaction/transaction.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Entity({ name: 'pos_transaction_item' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  branchId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.transactionItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  menuItem: MenuItem;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  transaction: Transaction;

  @ManyToOne(() => Branch, (branch) => branch.transactionItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  branch?: Branch;

  @CreateDateColumn()
  createdAt: Date;
}
