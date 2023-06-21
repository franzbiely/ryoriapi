import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Users } from '../user/user.entity';

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

  @ManyToMany(() => Users, (user) => user.branch, { onDelete: 'CASCADE' })
  user: Users[];

  @CreateDateColumn()
  createdAt: Date;
}
