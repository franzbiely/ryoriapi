/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { FoodService } from "../foods/food.service";
import { CategoryRepository } from "./category.repository";
import { FoodsRepository } from "../foods/food.repository";
import { Category } from "./category.entity";
import { Foods } from "../foods/food.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Category, Foods, FoodsRepository, CategoryRepository])],
    controllers: [CategoryController],
    providers: [CategoryService, FoodService],
})

export class CategoryModule{}