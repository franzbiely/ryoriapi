import { Injectable } from '@nestjs/common';
import { IBranchItem } from './branchItem.model';
import { CreateBranchItemDto } from './dto/create-branchItem.dto';
import { UpdateBranchItemDto } from './dto/update-branchItem.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from './../product/menuItem/menuItem.model';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMenuCategory } from '../product/menuCategory/menuCategory.model';

@Injectable()
export class BranchItemService {
  constructor(
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('BranchItem')
    private readonly branchItemModel: Model<IBranchItem>,
    @InjectModel('MenuCategory')
    private readonly menuCategory: Model<IMenuCategory>,
  ) {}

  async findAll(branch_Id: ObjectId, category_Id: ObjectId = null): Promise<any[]> {
    const menuItem = await this.menuItemModel.find({
      menuCategory: {
        $elemMatch: {
          $eq: category_Id
        }
      }
    })
    const query = this.branchItemModel.find({
      branch: branch_Id,
      menuItem
    })
    .populate('menuItem')
    .populate('menuItem.menuCategory')
    .populate('branch')
    const result = await query.lean();
    return result;
  }

  async findOne(id: ObjectId): Promise<IBranchItem> {
    const menuItem = await this.menuItemModel.find({_id: id}).exec()
    return this.branchItemModel.findOne({menuItem:menuItem})
      .populate('branch')
      .populate('menuItem')
      .lean();
  }

  async save(dto: CreateBranchItemDto): Promise<IBranchItem | any> {
    const branch = await this.branchModel.findOne({_id: dto.branch_Id}).exec()
    const menuItem = await this.menuItemModel.findOne({_id: dto.menuItem_Id}).exec()
    const branchItem = await this.branchItemModel.findOne({
      branch: branch,
      menuItem: menuItem,
    }).exec();

    if (branchItem) {
      return this.update(branchItem.id, dto);
    } else {
      return this.create(dto);
    }
  }

  async create(_quantity: CreateBranchItemDto): Promise<IBranchItem> {
    const qty = new this.branchItemModel({
      quantity: _quantity.quantity,
      branch: _quantity.branch_Id,
      menuItem: _quantity.menuItem_Id,
    });

    await qty.save();
    return qty
  }

  async update(id: ObjectId, updateQuantityDto: UpdateBranchItemDto): Promise<IBranchItem> {
    const branchItem = await this.branchItemModel.findOne({_id:id}).exec();
    console.log({branchItem})
    const { quantity, branch_Id, menuItem_Id } = updateQuantityDto;
    branchItem.quantity = quantity;

    if (branch_Id) {
      branchItem.branch = branch_Id;
    }
    if (menuItem_Id) {
      branchItem.menuItem = menuItem_Id;
    }

    await branchItem.save();
    return branchItem
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.branchItemModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
