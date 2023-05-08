/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "categories"})
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    parent_category_id: number;

    // @Todo: Set as foreign key
    // @Column()
    // store_id: string;

    @CreateDateColumn()
    createdAt: Date;
}