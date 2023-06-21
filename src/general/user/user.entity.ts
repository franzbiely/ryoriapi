import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @OneToMany(() => Store, (store) => store.user, { onDelete: 'CASCADE' })
  store: Store[];

  @CreateDateColumn()
  createdAt: Date;
}
