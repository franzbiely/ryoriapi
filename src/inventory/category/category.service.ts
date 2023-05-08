/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Category as Category} from "./category.entity";
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    //Get All User
    findAll(): Promise<Category[]> {
        return this.categoryRepository.find({});
    }

    findOne(id: number): Promise<Category>{
        const x = this.categoryRepository.findOneBy({id});
        return x;
    }

    async create(_category: CreateCategoryDto): Promise<Category>{
        const category = new Category();
        category.title = _category.title
        category.photo = _category.photo
        return this.categoryRepository.save(category);
    }

    async update(id: number, category:Category) {
        await this.categoryRepository.update(id, category)
    }

    async remove(id: number): Promise<void>{
        await this.categoryRepository.delete(id);
    }

}