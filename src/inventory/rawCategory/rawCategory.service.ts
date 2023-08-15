/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawCategory as Category, RawCategory } from './rawCategory.entity';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';
import { Branch } from 'src/general/branch/branch.entity';

@Injectable()
export class RawCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  //Get All User
  findAll(branch_Id: number): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'rawGrocery'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const getOneById = this.categoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'rawGrocery'],
    });
    return getOneById;
  }

  async create(_category: CreateRawCategoryDto): Promise<Category> {
    const category = new Category();
    category.title = _category.title;

    if (_category.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _category.branch_Id },
      });
      category.branch = branch;
    }
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    category: UpdateRawCategoryDto,
  ): Promise<RawCategory> {
    const rawCategory = await this.findOne(id);
    const { title, branch_Id } = category;

    rawCategory.title = title;

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      rawCategory.branch = branch;
    }

    return await this.categoryRepository.save(rawCategory);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
