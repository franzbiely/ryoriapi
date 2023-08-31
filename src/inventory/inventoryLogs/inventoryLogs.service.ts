import { Injectable } from '@nestjs/common';
import { IInventoryLogs } from './inventoryLogs.model';
import { CreateInventoryLogsDto } from './dto/create-inventoryLogs.dto';
import { UpdateInventoryLogsDto } from './dto/update-inventoryLogs.dto';
import { IUsers } from 'src/general/user/user.model';
import { IBranch } from 'src/general/branch/branch.model';
import { IRawGrocery } from '../rawGrocery/rawInventory.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

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

  findAll(branch_Id: ObjectId): Promise<IInventoryLogs[]> {
    return this.invLogsModel.find({
      branch: branch_Id,
    }).populate('branch rawGrocery').exec();
  }

  async findOne(id: ObjectId): Promise<IInventoryLogs> {
    return this.invLogsModel.findOne({_id:id}).populate('rawGrocery user').lean();
  }

  async create(_inventoryLogs: CreateInventoryLogsDto): Promise<IInventoryLogs> {
    const logs = new this.invLogsModel({
      type: _inventoryLogs.type,
      quantityLogs: _inventoryLogs.quantityLogs,
    });

    if (_inventoryLogs.user_Id) {
      const user = await this.userModel.findOne({_id:_inventoryLogs.user_Id});
      logs.user = user._id;
    }
    if (_inventoryLogs.rawGrocery_Id) {
      const rawGrocery = await this.rawGroceryModel.findOne({_id:_inventoryLogs.rawGrocery_Id});
      logs.rawGrocery = rawGrocery._id;
    }
    if (_inventoryLogs.branch_Id) {
      const branch = await this.branchModel.findOne({_id:_inventoryLogs.branch_Id});
      logs.branch = branch._id;
    }
    await logs.save();
    return logs
  }

  async update(id: ObjectId, updateInvLogsDto: UpdateInventoryLogsDto): Promise<IInventoryLogs> {
    const inventoryLog = await this.invLogsModel.findOne({ _id: id });

    const { type, quantityLogs, user_Id } = updateInvLogsDto;
    inventoryLog.type = type;
    inventoryLog.quantityLogs = quantityLogs;

    if (user_Id) {
      const user = await this.userModel.findOne({_id:user_Id});
      inventoryLog.user = user._id;
    }

    await inventoryLog.save();
    return inventoryLog
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.invLogsModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
