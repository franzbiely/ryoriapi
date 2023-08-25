import { Injectable } from '@nestjs/common';
import { IBranchItem } from './branchItem.model';
import { CreateBranchItemDto } from './dto/create-branchItem.dto';
import { UpdateBranchItemDto } from './dto/update-branchItem.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from '../product/menuItem/menuItem.model';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BranchItemService {
  constructor(
    @InjectModel('BranchItem')
    private readonly quantityModel: Model<IBranchItem>,

    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('BranchItem')
    private readonly branchItemModel: Model<IBranchItem>,
  ) {}

  async findAll(branch_Id: number, category_Id: number = -1): Promise<any[]> {
    const where = (category_Id < 0) ? {
      branch: branch_Id,
    } : {
      branch: branch_Id,
      menuItem: {
        menuCategory: category_Id,
      },
    };

    return this.branchItemModel.find(where)
      .populate({ path: 'branch menuItem', populate: { path: 'menuCategory' } })
      .exec();
  }

  async findOne(id: ObjectId): Promise<IBranchItem> {
    return this.branchItemModel.findById(id)
      .populate({ path: 'branch menuItem' })
      .exec();
  }

  async save(dto: CreateBranchItemDto): Promise<IBranchItem | any> {
    const branchItem = await this.branchItemModel.findOne({
      branch: dto.branch_Id,
      menuItem: dto.menuItem_Id,
    });

    if (branchItem) {
      // return this.update(branchItem.id, dto);
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
    const branchItem = await this.branchItemModel.findOne({id});
    const { quantity, branch_Id, menuItem_Id } = updateQuantityDto;
    branchItem.quantity = quantity;

    // if (branch_Id) {
    //   branchItem.branch = branch_Id;
    // }
    // if (menuItem_Id) {
    //   branchItem.menuItem = menuItem_Id;
    // }

    await branchItem.save();
    return branchItem
  }

  async remove(id: ObjectId): Promise<void> {
    await this.branchItemModel.deleteOne({ _id: id }).exec();
  }
}
