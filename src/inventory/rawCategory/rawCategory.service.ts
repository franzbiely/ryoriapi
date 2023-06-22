/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawCategory as Category } from './rawCategory.entity';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';

@Injectable()
export class RawCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  //Get All User
  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({});
  }

  findOne(id: number): Promise<Category> {
    const x = this.categoryRepository.findOneBy({ id });
    return x;
  }

  async create(_category: CreateRawCategoryDto): Promise<Category> {
    const category = new Category();
    category.title = _category.title;
    return this.categoryRepository.save(category);
  }

  async update(id: number, _category: UpdateRawCategoryDto) {
    const rawCategory = await this.findOne(id);
    const {title} = _category;

    rawCategory.title = title;

    return await this.categoryRepository.save(rawCategory);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
