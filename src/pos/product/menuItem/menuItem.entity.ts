import { Store } from 'src/general/store/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuCategory } from '../menuCategory/menuCategory.entity';
import { BranchItem } from 'src/pos/branchItem/branchItem.entity';

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
  description: string;

  @Column()
  cookingTime: string;

  @ManyToMany(() => MenuCategory, (menuCategory) => menuCategory.menuItem, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  menuCategory: MenuCategory[];

  @Column()
  storeId: number;

  // @Column()
  // branchItemId: number;

  @ManyToOne(() => Store, (store) => store.menuItem, { onDelete: 'CASCADE' })
  @JoinColumn()
  store: Store;

  @OneToMany(() => BranchItem, (quantity) => quantity.menuItem, {
    onDelete: 'CASCADE',
  })
  branchItem: BranchItem[];

  @CreateDateColumn()
  createdAt: Date;
}
