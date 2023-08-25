/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IRawCategory } from './rawCategory.model';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RawCategoryService {
  constructor(
    @InjectModel('RawCategory')
    private readonly rawCategoryModel: Model<IRawCategory>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) {}

  //Get All User
  findAll(branch_Id: number): Promise<IRawCategory[]> {
    return this.rawCategoryModel.find({ branch: branch_Id }).populate('branch rawGrocery').exec();
  }

  async findOne(id: number): Promise<IRawCategory> {
    return this.rawCategoryModel.findById(id).populate('branch rawGrocery').exec();
  }

  async create(_category: CreateRawCategoryDto): Promise<IRawCategory> {
    const category = new this.rawCategoryModel({ title: _category.title });

    if (_category.branch_Id) {
      const branch = await this.branchModel.findById(_category.branch_Id);
      category.branch = branch._id;
    }
    await category.save();
    return category
  }

  async update(id: number, category: UpdateRawCategoryDto): Promise<IRawCategory> {
    const rawCategory = await this.rawCategoryModel.findOne({id});
    const { title, branch_Id } = category;

    rawCategory.title = title;

    if (branch_Id) {
      const branch = await this.branchModel.findById(branch_Id);
      rawCategory.branch = branch._id;
    }

    await rawCategory.save();
    return rawCategory
  }

  async remove(id: number): Promise<void> {
    await this.rawCategoryModel.deleteOne({ _id: id }).exec();
  }
}
