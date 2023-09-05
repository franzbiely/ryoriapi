import { Injectable } from '@nestjs/common';
import { ITransactionItem } from './transactionItem.model';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';
import { ITransaction } from '../transaction/transaction.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { UpdateTransactionItemDto } from './dto/update-transactionItem.dto';
import { IBranch } from 'src/general/branch/branch.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectModel('TransactionItem')
    // private readonly catModel: Model<Cat>
    private readonly transactionItemModel: Model<ITransactionItem>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransaction>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) {}

  findAll(branch_Id: ObjectId): Promise<ITransactionItem[]> {
    return this.transactionItemModel
      .find({ branch: branch_Id })
      .populate('branch')
      .populate('transaction')
      .exec();
  }

  findOne(id: ObjectId): Promise<ITransactionItem> {
    return this.transactionItemModel
      .findOne({ _id: id })
      .populate('branch')
      .populate('transaction')
      .lean();
  }

  async create(
    _transaction: CreateTransactionItemDto,
  ): Promise<ITransactionItem | any> {
    const transactionItem = new this.transactionItemModel({
      status : _transaction.status,
      quantity : _transaction.quantity,
    });

    if (_transaction.transaction_Id) {
      const transaction = await this.transactionModel.findOne({_id: _transaction.transaction_Id }).exec();
      transactionItem.transaction = transaction;
      transaction.transactionItem.push(transactionItem)
      transaction.save()
    }
    if (_transaction.menuItem_Id) {
      const menuItem = await this.menuItemModel.findOne({_id: _transaction.menuItem_Id }).exec();
      transactionItem.menuItem = menuItem;
    }

    if (_transaction.branch_Id) {
      const branch = await this.branchModel.findOne({ _id: _transaction.branch_Id }).exec();
      transactionItem.branch = branch;
    }
    return await transactionItem.save();
  }

  checkSameStatus(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null;
    }
    const firstStatus = data[0].status;
    for (let i = 1; i < data.length; i++) {
      if (data[i].status !== firstStatus) {
        return null;
      }
    }
    return firstStatus;
  }

  async update(
    id: ObjectId,
    updateTransactionItem: UpdateTransactionItemDto,
  ): Promise<ITransactionItem | any> {
    const transactionItem = await this.transactionItemModel.findOne({_id:id}).exec();
    const { status, quantity } = updateTransactionItem;
    transactionItem.status = updateTransactionItem.status || transactionItem.status;
    transactionItem.quantity = updateTransactionItem.quantity || transactionItem.quantity;

    const _transaction = await this.transactionModel.findOne({_id: transactionItem.transaction['_id'] }).exec();
    transactionItem.transaction = _transaction;
    const result = await transactionItem.save();

    const itemStatus = await this.transactionItemModel
      .find({ 'transaction.id': transactionItem.transaction['_id'] })
      .populate('transaction');

    const data = this.checkSameStatus(itemStatus);
    if (data) {
      _transaction.status = data;
      await _transaction.save();
    }

    return result;
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.transactionItemModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
