import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Store } from '../store/store.entity';

@Entity({ name: 'branch' })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contactNumber: string;

  @Column()
  address: string;

  @ManyToOne(() => Store, (store) => store.branch, { onDelete: 'CASCADE' })
  store: Store;

  @CreateDateColumn()
  createdAt: Date;
}
