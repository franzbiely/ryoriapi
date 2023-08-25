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
    return this.transactionItemModel.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'transaction'],
    });
  }

  findOne(id: ObjectId): Promise<ITransactionItem> {
    const findId = this.transactionItemModel.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'transaction'],
    });
    return findId;
  }

  async create(
    _transaction: CreateTransactionItemDto,
  ): Promise<ITransactionItem | any> {
    // const transactionItem = new TransactionItem();
    // transactionItem.status = _transaction.status;
    // transactionItem.quantity = _transaction.quantity;

    // if (_transaction.transaction_Id) {
    //   const transaction = await this.transactionModel.findOne({
    //     where: { id: _transaction.transaction_Id },
    //   });
    //   transactionItem.transaction = transaction;
    // }
    // if (_transaction.menuItem_Id) {
    //   const menuItem = await this.menuItemModel.findOne({
    //     where: { id: _transaction.menuItem_Id },
    //   });
    //   transactionItem.menuItem = menuItem;
    // }

    // if (_transaction.branch_Id) {
    //   const branch = await this.branchModel.findOne({
    //     where: { id: _transaction.branch_Id },
    //   });
    //   transactionItem.branch = branch;
    // }
    // return this.transactionItemModel.save(transactionItem);
  }
  checkSameStatus(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null;
    }
    const firstStatus = data[0].status;
    for (let i = 1; i < data.length; i++) {
      console.log(data[i]);
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
    // const transactionItem = await this.findOne(id);
    // const { status, quantity } = updateTransactionItem;
    // transactionItem.status = status;
    // transactionItem.quantity = quantity;

    // const _transaction = await this.transactionModel.findOne({
    //   where: { id: transactionItem.transaction.id },
    // });
    // transactionItem.transaction = _transaction;
    // const result = await this.transactionItemModel.save(transactionItem);

    // const itemStatus = await this.transactionItemModel.find({
    //   where: {
    //     transaction: {
    //       id: transactionItem.transaction.id,
    //     },
    //   },
    // });

    // const data = this.checkSameStatus(itemStatus);
    // if (data) {
    //   _transaction.status = data;
    //   await this.transactionModel.save(_transaction);
    // }

    // console.log({ transactionItem });

    // return result;
  }

  async remove(id: ObjectId): Promise<void> {
    // await this.transactionItemModel.delete(id);
  }
}
