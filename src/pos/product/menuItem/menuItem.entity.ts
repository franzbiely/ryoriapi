import { Branch } from 'src/general/branch/branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Branch, (branch) => branch.menuItem, {
    onDelete: 'CASCADE',
  })
  branch: Branch[];

  @CreateDateColumn()
  createdAt: Date;
}
