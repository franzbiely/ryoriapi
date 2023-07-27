/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "reviews"})
export class Reviews{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    rating: number;

    @CreateDateColumn()
    createdAt: Date;
}