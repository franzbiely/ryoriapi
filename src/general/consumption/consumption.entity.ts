/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "consumptions"})
export class Consumption{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    parent_consumption_id: number;

    // @Todo: Set as foreign key
    // @Column()
    // store_id: string;

    @CreateDateColumn()
    createdAt: Date;
}