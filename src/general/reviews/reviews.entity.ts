/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch } from "../branch/branch.entity";

@Entity({name: "reviews"})
export class Reviews{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    rating: number;

    @Column()
    branchId: number;

    @ManyToOne(() => Branch, (branch) => branch.rawCategory, {
        onDelete: 'CASCADE',
    })
    branch: Branch;

    @CreateDateColumn()
    createdAt: Date;
}