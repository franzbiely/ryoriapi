import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pos_transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
