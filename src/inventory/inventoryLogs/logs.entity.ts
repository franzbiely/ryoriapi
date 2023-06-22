/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'inv_logs' })
export class InvLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  quantity: number;

  // @Todo: Set as foreign key
  // @Column()
  // store_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
