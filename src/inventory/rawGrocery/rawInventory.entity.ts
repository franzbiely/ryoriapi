import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rawinventorygrocery' })
export class RawInvGroc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  weight: string;

  @Column()
  quantity: string;

  @CreateDateColumn()
  createdAt: Date;
}
