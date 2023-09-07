import { Injectable } from '@nestjs/common';
import { IBranchItem } from './branchItem.model';
import { CreateBranchItemDto } from './dto/create-branchItem.dto';
import { UpdateBranchItemDto } from './dto/update-branchItem.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from './../product/menuItem/menuItem.model';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMenuCategory } from '../product/menuCategory/menuCategory.model';
import { Utils } from 'src/utils/utils';

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
    private readonly utils: Utils
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
    const menuItem = await this.menuItemModel.findOne({_id: dto.menuItem_Id}).exec()
    // Might be transfered to branch
    // const branchItem = await this.branchItemModel.findOne({
    //   branch: branch,
    //   menuItem: menuItem,
    // }).exec();
    // if (branchItem) {
    //   return this.update(branchItem.id, dto);
    // } else {
    //   return this.create(dto);
    // }
  }

  async create(_branchItem: CreateBranchItemDto): Promise<IBranchItem> {
    const branchItem = new this.branchItemModel({
      quantity: _branchItem.quantity,
      menuItem: _branchItem.menuItem_Id,
    });

    if(_branchItem.branch_Id) {
      const branch = await this.branchModel.findOne({_id: _branchItem.branch_Id}).exec()
      branch.branchItems = await this.utils.pushWhenNew(branch.branchItems, branch);
      branch.save();
    }

    await branchItem.save();
    return branchItem
  }

  async update(id: ObjectId, updateQuantityDto: UpdateBranchItemDto): Promise<IBranchItem> {
    const branchItem = await this.branchItemModel.findOne({_id:id}).exec();
    const { quantity, menuItem_Id } = updateQuantityDto;
    branchItem.quantity = updateQuantityDto.quantity || branchItem.quantity;

    if (menuItem_Id) {
      const menuItem = await this.menuItemModel.findOne({_id:id}).exec();
      branchItem.menuItem = menuItem;
    }

    await branchItem.save();
    return branchItem
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.branchItemModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
