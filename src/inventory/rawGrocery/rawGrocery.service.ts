import { Injectable } from '@nestjs/common';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';
import { UpdateRawGroceryDto } from './dto/update-rawInventory.dto';
import { IRawCategory } from '../rawCategory/rawCategory.model';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IRawGrocery } from './rawGrocery.model';

@Injectable()
export class RawGroceryService {
  constructor(
    @InjectModel('RawGrocery')
    private readonly rawGroceryModel: Model<IRawGrocery>,
    @InjectModel('RawCategory')
    private readonly rawCategoryModel: Model<IRawCategory>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) {}

  async findAll(branch_Id: ObjectId): Promise<any[]> {
    const response = await this.rawGroceryModel.find({ branch: branch_Id })
      .populate({ path: 'branch inventoryLogs rawCategory', populate: { path: 'user' } })
      .exec();



    const newData = response.map((data) => ({
      ...data.toJSON(),
      // readyQty: data.inventoryLogs.reduce((prev, cur) => (cur.type === 'ready' ? prev + cur.quantityLogs : prev), 0),
      // wasteQty: data.inventoryLogs.reduce((prev, cur) => (cur.type === 'waste' ? prev + cur.quantityLogs : prev), 0),
    }));

    return newData;
  }

  async findOne(id: ObjectId): Promise<IRawGrocery> {
    return this.rawGroceryModel.findOne({_id:id})
      .populate({ path: 'branch rawCategory inventoryLogs', populate: { path: 'user' } })
      .lean();
  }

  async create(_rawInv: CreateRawGroceryDto): Promise<IRawGrocery> {
    const rawGroc = new this.rawGroceryModel({
      item: _rawInv.item,
      weight: _rawInv.weight,
      quantity: _rawInv.quantity,
    });

    if (_rawInv.branch_Id) {
      const branch = await this.branchModel.findOne({_id:_rawInv.branch_Id});
      rawGroc.branch = branch;
    }

    if (_rawInv.rawCategory_Id) {
      const rawCategory = await this.rawCategoryModel.findOne({_id:_rawInv.rawCategory_Id});
      rawGroc.rawCategory = [rawCategory];
    }

    await rawGroc.save();
    return rawGroc
  }

  async update(id: ObjectId, rawGroceryDto: UpdateRawGroceryDto): Promise<IRawGrocery> {
    const rawGrocery = await this.rawGroceryModel.findOne({_id:id});
    const { item, weight, quantity, rawCategory_Id } = rawGroceryDto;

    rawGrocery.item = item;
    rawGrocery.weight = weight;
    rawGrocery.quantity = quantity;

    if (rawCategory_Id) {
      const rawCategory = await this.rawCategoryModel.findOne({_id:rawCategory_Id});
      rawGrocery.rawCategory = [rawCategory];
    }

    await rawGrocery.save();
    return rawGrocery
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.rawGroceryModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}