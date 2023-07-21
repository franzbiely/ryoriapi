import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { TransactionItem } from '../transactionItem/transactionItem.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
  ) {}

  //Get All User
  findAll(branch_Id: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'transactionItem'],
    });
  }

  findOne(id: number): Promise<Transaction> {
    const findId = this.transactionRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'transactionItem'],
    });
    return findId;
  }

  async create(_transaction: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.status = _transaction.status;
    let branch;
    if (_transaction.branch_Id) {
      branch = await this.branchRepository.findOne({
        where: { id: _transaction.branch_Id },
      });
    }
    if (_transaction.branch_Id) {
      transaction.branch = branch;
    }
    const currentTransaction = await this.transactionRepository.save(
      transaction,
    );
    console.log({ _transaction });
    if (!Array.isArray(_transaction.item)) {
      _transaction.item = [_transaction.item];
    }
    await Promise.all(
      _transaction.item.map(async (item) => {
        const _item = JSON.parse(item);
        const menuItem = await this.menuItemRepository.findOne({
          where: { id: _item.id },
        });

        const transactionItem = new TransactionItem();
        transactionItem.quantity = _item.qty;
        transactionItem.status = 'new';
        transactionItem.menuItem = menuItem;
        transactionItem.transaction = currentTransaction;
        if (_transaction.branch_Id) {
          transactionItem.branch = branch;
        }
        console.log({ transactionItem });
        await this.transactionItemRepository.save(transactionItem);
      }),
    );
    return currentTransaction;
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.findOne(id);
    const { status } = updateTransactionDto;
    transaction.status = status;

    return await this.transactionRepository.save(transaction);
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
