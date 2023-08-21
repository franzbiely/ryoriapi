import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
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
  notes: string;

  @Column()
  amount: number;

  @Column({
    default: '',
  })
  paymongo_pi_id?: string;

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
