import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Branch } from '../branch/branch.entity';
import { IsOptional } from '@nestjs/class-validator';
import { InventoryLogs } from 'src/inventory/inventoryLogs/inventoryLogs.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  userPhoto: string;

  @IsOptional()
  address: string;

  @IsOptional()
  storeId?: number;

  @ManyToOne(() => Store, (store) => store.user, { onDelete: 'CASCADE' })
  store: Store;

  @ManyToMany(() => Branch, (branch) => branch.user, { onDelete: 'CASCADE' })
  @JoinTable()
  branch: Branch[];

  @OneToMany(() => InventoryLogs, (inventoryLogs) => inventoryLogs.user, {
    onDelete: 'CASCADE',
  })
  inventoryLogs: InventoryLogs[];

  @CreateDateColumn()
  createdAt: Date;
}
