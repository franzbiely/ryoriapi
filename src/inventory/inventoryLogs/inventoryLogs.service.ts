import { Injectable } from '@nestjs/common';
import { IInventoryLogs } from './inventoryLogs.model';
import { CreateInventoryLogsDto } from './dto/create-inventoryLogs.dto';
import { UpdateInventoryLogsDto } from './dto/update-inventoryLogs.dto';
import { IUsers } from 'src/general/user/user.model';
import { IBranch } from 'src/general/branch/branch.model';
import { IRawGrocery } from '../rawGrocery/rawInventory.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InventoryLogsService {
  constructor(
    @InjectModel('InventoryLogs')
    private readonly invLogsModel: Model<IInventoryLogs>,
    @InjectModel('Users')
    private readonly userModel: Model<IUsers>,
    @InjectModel('RawGrocery')
    private readonly rawGroceryModel: Model<IRawGrocery>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) { }

  findAll(branch_Id: number): Promise<IInventoryLogs[]> {
    return this.invLogsModel.find({
      branchId: branch_Id,
    }).populate('branch rawGrocery').exec();
  }

  async findOne(id: number): Promise<IInventoryLogs> {
    return this.invLogsModel.findById(id).populate('rawGrocery user').exec();
  }

  async create(_inventoryLogs: CreateInventoryLogsDto): Promise<IInventoryLogs> {
    const logs = new this.invLogsModel({
      type: _inventoryLogs.type,
      quantityLogs: _inventoryLogs.quantityLogs,
    });

    if (_inventoryLogs.user_Id) {
      const user = await this.userModel.findById(_inventoryLogs.user_Id);
      logs.user = user._id;
    }
    if (_inventoryLogs.rawGrocery_Id) {
      const rawGrocery = await this.rawGroceryModel.findById(_inventoryLogs.rawGrocery_Id);
      logs.rawGrocery = rawGrocery._id;
    }
    if (_inventoryLogs.branch_Id) {
      const branch = await this.branchModel.findById(_inventoryLogs.branch_Id);
      logs.branch = branch._id;
    }
    return logs.save();
  }

  async update(id: number, updateInvLogsDto: UpdateInventoryLogsDto): Promise<IInventoryLogs> {
    const inventoryLog = await this.invLogsModel.findOne({ id });

    const { type, quantityLogs, user_Id } = updateInvLogsDto;
    inventoryLog.type = type;
    inventoryLog.quantityLogs = quantityLogs;

    if (user_Id) {
      const user = await this.userModel.findById(user_Id);
      inventoryLog.user = user._id;
    }

    return inventoryLog.save();
  }

  async remove(id: number): Promise<void> {
    await this.invLogsModel.deleteOne({ _id: id }).exec();
  }
}
