import { Injectable } from '@nestjs/common';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';
import { UpdateRawGroceryDto } from './dto/update-rawInventory.dto';
import { IRawCategory } from '../rawCategory/rawCategory.model';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IRawGrocery } from './rawGrocery.model';
import { Utils } from 'src/utils/utils';

@Injectable()
export class RawGroceryService {
  constructor(
    @InjectModel('RawGrocery')
    private readonly rawGroceryModel: Model<IRawGrocery>,
    @InjectModel('RawCategory')
    private readonly rawCategoryModel: Model<IRawCategory>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    private readonly utils: Utils,
  ) {}

  async findAll(branch_Id: ObjectId): Promise<any[] | any> {
    const branch = await this.branchModel
      .findOne({ _id: branch_Id })
      .populate('rawCategorys')
      .populate({
        path: 'rawGrocerys',
        populate: {
          path: 'inventoryLogs',
        },
      })
      .populate({
        path: 'rawGrocerys',
        populate: {
          path: 'rawCategories',
        },
      })
      .populate('branchItems')
      .lean();

    const response = branch.rawGrocerys;

    const newData = response.map((data) => ({
      ...data,
      readyQty: data.inventoryLogs.reduce(
        (prev, cur) => (cur.type === 'ready' ? prev + cur.quantityLogs : prev),
        0,
      ),
      wasteQty: data.inventoryLogs.reduce(
        (prev, cur) => (cur.type === 'waste' ? prev + cur.quantityLogs : prev),
        0,
      ),
    }));

    return newData;
  }

  async findOne(id: ObjectId): Promise<IRawGrocery> {
    return this.rawGroceryModel
      .findOne({ _id: id })
      .populate('rawCategories')
      .populate('inventoryLogs')
      .populate({
        path: 'inventoryLogs',
        populate: {
          path: 'user',
        },
      })
      .lean();
  }

  async create(_rawInv: CreateRawGroceryDto): Promise<IRawGrocery> {
    const rawGroc = new this.rawGroceryModel({
      item: _rawInv.item,
      weight: _rawInv.weight,
      quantity: _rawInv.quantity,
      user: _rawInv.user_Id,
    });

    if (_rawInv.rawCategory_Id) {
      rawGroc.rawCategories = await this.utils.pushWhenNew(
        rawGroc.rawCategories,
        _rawInv.rawCategory_Id,
      );
    }

    if (_rawInv.branch_Id) {
      const branch = await this.branchModel
        .findOne({ _id: _rawInv.branch_Id })
        .exec();
      branch.rawGrocerys = await this.utils.pushWhenNew(
        branch.rawGrocerys,
        rawGroc,
      );
      branch.save();
    }

    await rawGroc.save();
    return rawGroc;
  }

  async update(
    id: ObjectId,
    rawGroceryDto: UpdateRawGroceryDto,
  ): Promise<IRawGrocery> {
    const rawGrocery = await this.rawGroceryModel.findOne({ _id: id }).exec();
    const { item, weight, quantity, rawCategory_Id } = rawGroceryDto;

    rawGrocery.item = rawGroceryDto.item || rawGrocery.item;
    rawGrocery.weight = rawGroceryDto.weight || rawGrocery.weight;
    rawGrocery.quantity = rawGroceryDto.quantity || rawGrocery.quantity;

    if (rawCategory_Id) {
      const rawCategory = await this.rawCategoryModel
        .findOne({ _id: rawCategory_Id })
        .exec();
      rawGrocery.rawCategories = [rawCategory];
    }

    await rawGrocery.save();
    return rawGrocery;
  }

  // async remove(id: ObjectId): Promise<string> {
  //   const result = await this.rawGroceryModel.deleteOne({ _id: id }).exec();
  //   return `Deleted ${result.deletedCount} record`;
  // }
  async remove(id: ObjectId): Promise<string> {
    try {
      const branchModel = await this.branchModel.findOne({ rawGrocerys: id });
      if (!branchModel) {
        throw new Error('BranchModel not found.');
      }

      const result = await this.rawGroceryModel.deleteOne({ _id: id }).exec();
      await this.branchModel
        .updateOne({ _id: branchModel._id }, { $pull: { rawGrocerys: id } })
        .exec();
      return `Deleted ${result.deletedCount} record`;
    } catch (error) {
      console.error(error);
      return 'Error deleting record';
    }
  }
}
