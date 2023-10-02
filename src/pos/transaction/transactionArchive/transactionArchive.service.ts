import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionArchiveDto } from './dto/create-transactionArchive.dto';
import { UpdateTransactionArchiveDto } from './dto/update-transactionArchive.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { ITransactionArchive } from './transactionArchive.model';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransactionItem } from '../transactionItem/transactionItem.model';
import { Utils } from 'src/utils/utils';
@Injectable()
export class TransactionArchiveService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransactionArchive>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('TransactionItem')
    private readonly transactionItemModel: Model<ITransactionItem>,
    private readonly utils: Utils,
  ) {}

  //Get All User
  async findAll(branch_Id: ObjectId): Promise<ITransactionArchive[] | any> {
    const response = await this.branchModel
      .findOne({ _id: branch_Id })
      .populate({
        path: 'transactions',
        populate: {
          path: 'transactionItems',
          populate: {
            path: 'menuItem',
          },
        },
      })
      .lean();
    const newData = response.transactions.map((data) => ({
      ...data,
      total: data.transactionItems.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));
    return newData;
  }

  async findOne(id: ObjectId): Promise<ITransactionArchive> {
    try {
      const transaction = await this.transactionModel
        .findOne({ _id: id })
        .populate({
          path: 'transactionItems',
          populate: {
            path: 'menuItem',
          },
        })
        .exec();

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      return transaction.toObject();
    } catch (error) {
      throw new Error('Error while fetching transaction');
    }
  }

  async create(
    _transaction: CreateTransactionArchiveDto,
  ): Promise<ITransactionArchive | any> {
    // TODO : Refactor this to aggregate
    // Check if bid and tid has already transaction, if yes then just add the transactionItem to the transaction.
    const branch = await this.branchModel
      .findOne({ _id: _transaction.branch_Id })
      .populate('transactions');
    const existingTransaction = branch.transactions.find(
      (transaction) => transaction.table === _transaction.table,
    );
  }

  async update(
    id: ObjectId,
    updateTransactionDto: UpdateTransactionArchiveDto,
  ): Promise<ITransactionArchive | any> {
    const transaction = await this.transactionModel.findOne({ _id: id }).exec();
    console.log({ updateTransactionDto });
    transaction.status = updateTransactionDto.status || transaction.status;
    transaction.notes = updateTransactionDto.notes || transaction.notes;
    transaction.charges = updateTransactionDto.charges || transaction.charges;
    transaction.discount =
      updateTransactionDto.discount || transaction.discount;

    if (updateTransactionDto.paymongo_pi_id) {
      transaction.paymongo_pi_id = updateTransactionDto.paymongo_pi_id;
    }
    console.log({ transaction });
    return await transaction.save();
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.transactionModel.deleteOne({ _id: id }).exec();
    // Cascade delete.
    const resultItem = await this.transactionItemModel
      .deleteMany({ transaction: id })
      .exec();

    return `Deleted ${result.deletedCount} record in transaction.
    Deleted ${resultItem.deletedCount} record in items.`;
  }
}
