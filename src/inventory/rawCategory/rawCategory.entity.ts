/* eslint-disable prettier/prettier */
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
import { RawGrocery } from '../rawGrocery/rawInventory.entity';

@Entity({ name: 'raw_category' })
export class RawCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => RawGrocery, (rawGrocery) => rawGrocery.rawCategory, {onDelete: 'CASCADE'})
  @JoinTable()
  rawGrocery?: RawGrocery[];

  @ManyToOne(() => Store, (store) => store.rawCategory, {onDelete: 'CASCADE'})
  store?: Store;

  @CreateDateColumn()
  createdAt: Date;
}
