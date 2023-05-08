/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "transactions"})
export class Transaction{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    parent_transaction_id: number;

    // @Todo: Set as foreign key
    // @Column()
    // store_id: string;

    @CreateDateColumn()
    createdAt: Date;
}