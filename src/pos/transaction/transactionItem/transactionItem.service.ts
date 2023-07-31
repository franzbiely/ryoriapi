import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionItem } from './transactionItem.entity';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';
import { Transaction } from '../transaction/transaction.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { UpdateTransactionItemDto } from './dto/update-transactionItem.dto';
import { Branch } from 'src/general/branch/branch.entity';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  findAll(branch_Id: number): Promise<TransactionItem[]> {
    return this.transactionItemRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'transaction'],
    });
  }

  findOne(id: number): Promise<TransactionItem> {
    const findId = this.transactionItemRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'transaction'],
    });
    return findId;
  }

  async create(
    _transaction: CreateTransactionItemDto,
  ): Promise<TransactionItem> {
    const transactionItem = new TransactionItem();
    transactionItem.status = _transaction.status;
    transactionItem.quantity = _transaction.quantity;

    if (_transaction.transaction_Id) {
      const transaction = await this.transactionRepository.findOne({
        where: { id: _transaction.transaction_Id },
      });
      transactionItem.transaction = transaction;
    }
    if (_transaction.menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: _transaction.menuItem_Id },
      });
      transactionItem.menuItem = menuItem;
    }

    if (_transaction.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _transaction.branch_Id },
      });
      transactionItem.branch = branch;
    }
    return this.transactionItemRepository.save(transactionItem);
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
    id: number,
    updateTransactionItem: UpdateTransactionItemDto,
  ): Promise<TransactionItem> {
    const transactionItem = await this.findOne(id);
    const { status, quantity } = updateTransactionItem;
    transactionItem.status = status;
    transactionItem.quantity = quantity;

    const _transaction = await this.transactionRepository.findOne({
      where: { id: transactionItem.transaction.id },
    });
    transactionItem.transaction = _transaction;
    const result = await this.transactionItemRepository.save(transactionItem);

    const itemStatus = await this.transactionItemRepository.find({
      where: {
        transaction: {
          id: transactionItem.transaction.id,
        },
      },
    });

    const data = this.checkSameStatus(itemStatus);
    if (data) {
      _transaction.status = data;
      await this.transactionRepository.save(_transaction);
    }

    console.log({ transactionItem });

    return result;
  }

  async remove(id: number): Promise<void> {
    await this.transactionItemRepository.delete(id);
  }
}
