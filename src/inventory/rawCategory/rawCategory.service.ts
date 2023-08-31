/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IRawCategory } from './rawCategory.model';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class RawCategoryService {
  constructor(
    @InjectModel('RawCategory')
    private readonly rawCategoryModel: Model<IRawCategory>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) {}

  //Get All User
  findAll(branch_Id: ObjectId): Promise<IRawCategory[]> {
    return this.rawCategoryModel.find({ branch: branch_Id }).populate('branch rawGrocery').exec();
  }

  async findOne(id: ObjectId): Promise<IRawCategory> {
    return this.rawCategoryModel.findOne({_id:id}).populate('branch rawGrocery').lean();
  }

  async create(_category: CreateRawCategoryDto): Promise<IRawCategory> {
    const category = new this.rawCategoryModel({ title: _category.title });

    if (_category.branch_Id) {
      const branch = await this.branchModel.findOne({_id:_category.branch_Id});
      category.branch = branch;
    }
    await category.save();
    return category
  }

  async update(id: ObjectId, category: UpdateRawCategoryDto): Promise<IRawCategory> {
    const rawCategory = await this.rawCategoryModel.findOne({_id:id});
    const { title, branch_Id } = category;

    rawCategory.title = title;

    if (branch_Id) {
      const branch = await this.branchModel.findOne({_id:branch_Id});
      rawCategory.branch = branch;
    }

    await rawCategory.save();
    return rawCategory
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.rawCategoryModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
