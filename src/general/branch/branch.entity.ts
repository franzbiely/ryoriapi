import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Users } from '../user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';

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

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.branch, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  menuItem: MenuItem[];

  @CreateDateColumn()
  createdAt: Date;
}
