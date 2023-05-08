/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,ManyToMany,   BaseEntity } from "typeorm";
import { Foods } from "../foods/food.entity";

@Entity({name: "category"})
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    image: string;

    @ManyToMany(() => Foods, (food) => food.category)
    food: Foods[];

    @CreateDateColumn()
    createdAt: Date;
}