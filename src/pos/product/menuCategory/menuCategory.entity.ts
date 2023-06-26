import { Store } from 'src/general/store/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from '../menuItem/menuItem.entity';

@Entity({ name: 'menu_category' })
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  photo: string;

  @ManyToMany(() => MenuItem, (menuItem ) => menuItem .menuCategory, {onDelete: 'CASCADE'})
  menuItem : MenuItem[];

  @ManyToOne(() => Store, (store) => store.menuCategory, {onDelete: 'CASCADE'})
  store: Store[];

  @CreateDateColumn()
  createdAt: Date;
}
