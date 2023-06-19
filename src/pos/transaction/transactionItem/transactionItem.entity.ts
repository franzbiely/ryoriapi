import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pos_transaction_item' })
export class TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
