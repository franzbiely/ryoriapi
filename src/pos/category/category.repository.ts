/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Category as Category} from './category.entity';
import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

}