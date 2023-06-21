import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from '../user/user.entity';
import { Branch } from '../branch/branch.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @OneToMany(() => Branch, (branch) => branch.store)
  branch: Branch[];

  @ManyToOne(() => Users, (user) => user.store, { onDelete: 'CASCADE' })
  user: Users;

  @CreateDateColumn()
  createdAt: Date;
}
