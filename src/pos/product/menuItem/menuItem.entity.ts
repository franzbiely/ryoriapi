import { Branch } from 'src/general/branch/branch.entity';
import { Store } from 'src/general/store/store.entity';
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
import { MenuCategory } from '../menuCategory/menuCategory.entity';

@Entity({ name: 'menu_item' })
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  photo: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  cookingTime: string;

  @ManyToMany(() => MenuCategory, (menuCategory) => menuCategory.menuItem, {onDelete: 'CASCADE'})
  @JoinTable()
  menuCategory: MenuCategory[];

  @ManyToOne(() => Store, (store) => store.menuItem, { onDelete: 'CASCADE' })
  store: Store;

  @CreateDateColumn()
  createdAt: Date;
}
