import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity({ name: 'pos_transaction_item' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItem, { onDelete: 'CASCADE' })
  transaction: Transaction;

  @CreateDateColumn()
  createdAt: Date;
}
