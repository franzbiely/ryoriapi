import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionItem } from '../transactionItem/transactionItem.entity';

@Entity({ name: 'pos_transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  table: string;

  @Column()
  branchId: number;

  @ManyToOne(() => Branch, (branch) => branch.transaction, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
    { onDelete: 'CASCADE' },
  )
  transactionItem: TransactionItem[];

  @CreateDateColumn()
  createdAt: Date;
}
