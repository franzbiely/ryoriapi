/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'logs_type' })
export class LogsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  add: string;

  @Column()
  thaw: string;

  @Column()
  throw: string;

  @CreateDateColumn()
  createdAt: Date;
}
