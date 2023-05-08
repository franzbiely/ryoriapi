/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import { Category } from "../category/category.entity";

@Entity({name: "foods"})
export class Foods extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    foodName:string;

    @Column()
    price:string;

    @ManyToMany(() => Category, (category) => category.food, { cascade: true, })
    @JoinTable()
    category: Category[];

    @CreateDateColumn()
    createdAt: Date;
}