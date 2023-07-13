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
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { RawCategory } from 'src/inventory/rawCategory/rawCategory.entity';
import { MenuCategory } from 'src/pos/product/menuCategory/menuCategory.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @OneToMany(() => Branch, (branch) => branch.store)
  branch: Branch[];

  @Column()
  photo: string;
  
  @OneToMany(() => Users, (user) => user.store, { onDelete: 'CASCADE' })
  user: Users[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.store, {
    onDelete: 'CASCADE',
  })
  menuItem: MenuItem[];

  @OneToMany(() => MenuCategory, (menuCategory) => menuCategory.store, {
    onDelete: 'CASCADE',
  })
  menuCategory: MenuCategory[];

  @CreateDateColumn()
  createdAt: Date;
}
