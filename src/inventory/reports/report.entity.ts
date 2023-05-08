/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "reports"})
export class Report{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    parent_report_id: number;

    // @Todo: Set as foreign key
    // @Column()
    // store_id: string;

    @CreateDateColumn()
    createdAt: Date;
}