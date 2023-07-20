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
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuCategory } from '../menuCategory/menuCategory.entity';
import { BranchItem } from 'src/pos/branchItem/branchItem.entity';
import { Transaction } from 'src/pos/transaction/transaction/transaction.entity';
import { TransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.entity';

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

  @ManyToOne(() => Store, (store) => store.menuItem, { onDelete: 'CASCADE' })
  @JoinColumn()
  store: Store;

  @OneToMany(() => BranchItem, (quantity) => quantity.menuItem, {
    onDelete: 'CASCADE',
  })
  branchItem: BranchItem[];
  @ManyToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.menuItem,
    {
      onDelete: 'CASCADE',
    },
  )
  transactionItem: TransactionItem[];

  @CreateDateColumn()
  createdAt: Date;
}
