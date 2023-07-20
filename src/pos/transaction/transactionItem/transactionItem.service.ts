import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionItem } from './transactionItem.entity';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';
import { Transaction } from '../transaction/transaction.entity';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  //Get All User
  findAll(): Promise<TransactionItem[]> {
    return this.transactionItemRepository.find({});
  }

  findOne(id: number): Promise<TransactionItem> {
    const x = this.transactionItemRepository.findOneBy({ id });
    return x;
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
    return this.transactionItemRepository.save(transactionItem);
  }

  async update(id: number, transactionItem: TransactionItem) {
    await this.transactionItemRepository.update(id, transactionItem);
  }

  async remove(id: number): Promise<void> {
    await this.transactionItemRepository.delete(id);
  }
}
