import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { TransactionItem } from '../transactionItem/transactionItem.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';

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
  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({});
  }

  findOne(id: number): Promise<Transaction> {
    const x = this.transactionRepository.findOneBy({ id });
    return x;
  }

  async create(_transaction: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.status = _transaction.status;

    if (_transaction.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _transaction.branch_Id },
      });
      transaction.branch = branch;
    }
    const currentTransaction = await this.transactionRepository.save(
      transaction,
    );
    await Promise.all(
      _transaction.item.map(async (item) => {
        const _item = JSON.parse(item);
        const menuItem = await this.menuItemRepository.findOne({
          where: { id: _item.id },
        });

        const transactionItem = new TransactionItem();
        transactionItem.quantity = _item.qty;
        transactionItem.status = 'new';
        transactionItem.menuItem = [menuItem];
        transactionItem.transaction = currentTransaction;
        console.log({ transactionItem });
        await this.transactionItemRepository.save(transactionItem);
      }),
    );
    return currentTransaction;
  }

  async update(id: number, transaction: Transaction) {
    await this.transactionRepository.update(id, transaction);
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
