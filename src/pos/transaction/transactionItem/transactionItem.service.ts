import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionItem } from './transactionItem.entity';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
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
    return this.transactionItemRepository.save(transactionItem);
  }

  async update(id: number, transactionItem: TransactionItem) {
    await this.transactionItemRepository.update(id, transactionItem);
  }

  async remove(id: number): Promise<void> {
    await this.transactionItemRepository.delete(id);
  }
}
