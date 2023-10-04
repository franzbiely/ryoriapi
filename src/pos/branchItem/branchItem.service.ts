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
import { IUsers } from 'src/general/user/user.model';

@Injectable()
export class BranchItemService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUsers>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('BranchItem')
    private readonly branchItemModel: Model<IBranchItem>,
    @InjectModel('MenuCategory')
    private readonly menuCategory: Model<IMenuCategory>,
    private readonly utils: Utils,
  ) {}

  // TODO: branch_Id deprecated
  async findAll(
    branch_Id: ObjectId,
    category_Id: ObjectId = null,
  ): Promise<any[]> {
    const branch = await this.branchModel
      .findOne({ _id: branch_Id })
      .populate({
        path: 'branchItems',
        populate: {
          path: 'menuItem',
          populate: {
            path: 'menuCategories',
          },
        },
      })
      .lean();
    return branch.branchItems;
    // const menuItems = await this.menuItemModel.find({
    //   menuCategories: {
    //     $elemMatch: {
    //       $eq: category_Id
    //     }
    //   }
    // })
    // const branchItems = await this.branchItemModel.find({
    //     menuItem: {
    //         $in: menuItems
    //     }
    //   })
    //   .populate({
    //       path: 'menuItem',
    //       populate: {
    //         path: 'menuCategories'
    //     }
    //   })
    //   .lean()
    //   return branchItems
  }

  async findOne(id: ObjectId): Promise<IBranchItem> {
    return this.branchItemModel
      .findOne({ menuItem: id })
      .populate('menuItem')
      .lean();
  }

  async save(
    dto: CreateBranchItemDto,
    user_Id: String,
  ): Promise<IBranchItem | any> {
    const menuItem = await this.menuItemModel
      .findOne({ _id: dto.menuItem_Id })
      .exec();
    // Might be transfered to branch
    const branchItem = await this.branchItemModel
      .findOne({
        menuItem: menuItem,
      })
      .exec();
    if (branchItem) {
      return this.update(branchItem.id, dto);
    } else {
      return this.create(dto, user_Id);
    }
  }

  async create(
    _branchItem: CreateBranchItemDto,
    user_Id,
  ): Promise<IBranchItem> {
    const branchItem = new this.branchItemModel({
      quantity: _branchItem.quantity,
      menuItem: _branchItem.menuItem_Id,
    });

    const user = await this.userModel.findOne({ _id: user_Id }).exec();
    branchItem.user = user;

    if (_branchItem.branch_Id) {
      const branch = await this.branchModel
        .findOne({ _id: _branchItem.branch_Id })
        .exec();
      branch.branchItems = await this.utils.pushWhenNew(
        branch.branchItems,
        branchItem,
      );
      branch.save();
    }
    await branchItem.save();
    return branchItem;
  }

  async update(
    id: ObjectId,
    updateQuantityDto: UpdateBranchItemDto,
  ): Promise<IBranchItem> {
    const branchItem = await this.branchItemModel.findOne({ _id: id }).exec();
    const { quantity, menuItem_Id } = updateQuantityDto;
    branchItem.quantity = updateQuantityDto.quantity || branchItem.quantity;

    if (menuItem_Id) {
      const menuItem = await this.menuItemModel.findOne({ _id: id }).exec();
      branchItem.menuItem = menuItem;
    }

    await branchItem.save();
    return branchItem;
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.branchItemModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
