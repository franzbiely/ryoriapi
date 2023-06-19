import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;
}
