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

@Entity({ name: 'pos_transaction_item' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  quantity: number;
  @ManyToMany(() => MenuItem, (menuItem) => menuItem.transactionItem, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  menuItem: MenuItem[];

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItem, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;

  @CreateDateColumn()
  createdAt: Date;
}
