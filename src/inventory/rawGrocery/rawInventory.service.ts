import { Injectable } from '@nestjs/common';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';
import { UpdateRawGroceryDto } from './dto/update-rawInventory.dto';
import { IRawCategory } from '../rawCategory/rawCategory.model';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRawGrocery } from './rawInventory.model';

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

  async findAll(branch_Id: number): Promise<any[]> {
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

  async findOne(id: number): Promise<IRawGrocery> {
    return this.rawGroceryModel.findById(id)
      .populate({ path: 'branch rawCategory inventoryLogs', populate: { path: 'user' } })
      .exec();
  }

  async create(_rawInv: CreateRawGroceryDto): Promise<IRawGrocery> {
    const rawGroc = new this.rawGroceryModel({
      item: _rawInv.item,
      weight: _rawInv.weight,
      quantity: _rawInv.quantity,
    });

    if (_rawInv.branch_Id) {
      const branch = await this.branchModel.findById(_rawInv.branch_Id);
      rawGroc.branch = branch._id;
    }

    if (_rawInv.rawCategory_Id) {
      const rawCategory = await this.rawCategoryModel.findById(_rawInv.rawCategory_Id);
      rawGroc.rawCategory = [rawCategory._id];
    }

    return rawGroc.save();
  }

  async update(id: number, rawGroceryDto: UpdateRawGroceryDto): Promise<IRawGrocery> {
    const rawGrocery = await this.rawGroceryModel.findOne({id});
    const { item, weight, quantity, rawCategory_Id } = rawGroceryDto;

    rawGrocery.item = item;
    rawGrocery.weight = weight;
    rawGrocery.quantity = quantity;

    if (rawCategory_Id) {
      const rawCategory = await this.rawCategoryModel.findById(rawCategory_Id);
      rawGrocery.rawCategory = [rawCategory._id];
    }

    return rawGrocery.save();
  }

  async remove(id: number): Promise<void> {
    await this.rawGroceryModel.deleteOne({ _id: id }).exec();
  }
}
