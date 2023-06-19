import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rawinventorygrocery' })
export class RawGrocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  weight: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
