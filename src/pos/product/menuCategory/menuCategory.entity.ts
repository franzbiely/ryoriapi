import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'menu_category' })
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  photo: string;

  @CreateDateColumn()
  createdAt: Date;
}
