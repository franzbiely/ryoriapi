/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "items"})
export class Item{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    parent_item_id: number;

    // @Todo: Set as foreign key
    // @Column()
    // store_id: string;

    @CreateDateColumn()
    createdAt: Date;
}