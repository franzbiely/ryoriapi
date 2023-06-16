/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Foods } from "./food.entity";
import { CreateFoodDto } from './dto/create-food.dto';
import { Category as Category } from "../category/category.entity";
import { FoodsRepository } from "./food.repository";
import { CategoryRepository } from "../category/category.repository";
import { UpdateFoodDto } from "./dto/update-food.dto";

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(Foods)
        private foodRepository: FoodsRepository,
        @InjectRepository(Category)
        private categoryRepository: CategoryRepository
    ) {}

    findAll(): Promise<Foods[]> {
    return this.foodRepository.find({
        relations: ['category']
    });
    }

    async findOne(id: number): Promise<Foods> {
        const x = this.foodRepository.findOne({
            where: {
                id: id
            },
            relations: ['category'],
        });
        return x;
    }

    async create(_food: CreateFoodDto): Promise<Foods>{
        const food = new Foods();
        food.foodName = _food.foodName
        food.price = _food.price

        const category = await this.categoryRepository.findOne({where: {id: parseInt(_food.category)}});
        food.category = [category];
        console.log({food})
        return this.foodRepository.save(food);
    }

    async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Foods> {
        const food = await this.findOne(id);
        const category = await this.categoryRepository.findOne({where: {id: parseInt(updateFoodDto.category)}});
        console.log({
            food,
            updateFoodDto
        })
        const { foodName, price } = updateFoodDto;
        food.foodName = foodName;
        food.price = price;
        food.category = [category];

        return await food.save();
      }

    async remove(id: number): Promise<void>{
        await this.foodRepository.delete(id);
    }

}