/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category as Category} from "./category.entity";
import { CreateCategoryDto } from './dto/create-category.dto';
import { Foods } from "../foods/food.entity";
import { CategoryRepository } from "./category.repository";
import { FoodsRepository } from "../foods/food.repository";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: CategoryRepository,
        @InjectRepository(Foods)
        private foodRepository: FoodsRepository
    ) {}
    
    findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: ['food']
        });
    }

    async findOne(id: number): Promise<Category> {
        const x = this.categoryRepository.findOne({
            where: {
                id: id
            },
            relations: ['food'],
        });
        return x;
    }

    async create(_category: CreateCategoryDto): Promise<Category>{
        const category = new Category();
        category.label = _category.label
        category.image = _category.image

        const food = await this.foodRepository.findOne({where: {id: parseInt(_category.food)}});
        category.food = [food];
        console.log({food})

        return this.categoryRepository.save(category);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        const food = await this.foodRepository.findOne({where: {id: parseInt(updateCategoryDto.food)}});
        console.log({
            category,
            updateCategoryDto
        })
        const { label, image } = updateCategoryDto;
        category.label = label;
        category.image = image;
        category.food = [food];

        return await category.save();
      }

    async remove(id: number): Promise<void>{
        await this.categoryRepository.delete(id);
    }
}