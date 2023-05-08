/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  FoodService } from "./food.service";
import { FoodController } from "./food.controller";
import { FoodsRepository } from "./food.repository";
import { CategoryRepository } from "../category/category.repository";
import { Foods } from "./food.entity";
import { CategoryModule } from "../category/category.module";

@Module({
    imports:[TypeOrmModule.forFeature([
        Foods, 
        CategoryRepository,
        FoodsRepository
    ]),
    CategoryModule
],
    controllers: [FoodController],
    providers: [FoodService],
})

export class FoodModule{}