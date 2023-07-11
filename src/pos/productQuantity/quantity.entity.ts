import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from '../product/menuItem/menuItem.entity';

@Entity({ name: 'productquantity' })
export class Quantity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @ManyToMany(() => Branch, (branch) => branch.quantity, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  branch: Branch[];

  @Column()
  branchId: number;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.quantity, {
    onDelete: 'CASCADE',
  })
  menuItem: MenuItem;

  @CreateDateColumn()
  createdAt: Date;
}
