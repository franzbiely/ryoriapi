import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Branch } from '../branch/branch.entity';

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

  @ManyToOne(() => Store, (store) => store.user, { onDelete: 'CASCADE' })
  store: Store;

  @ManyToMany(() => Branch, (branch) => branch.user, { onDelete: 'CASCADE' })
  @JoinTable()
  branch: Branch[];

  @CreateDateColumn()
  createdAt: Date;
}
