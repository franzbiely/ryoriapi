import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { TransactionItem } from '../transactionItem/transactionItem.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PayTransactionDto } from './dto/pay-transaction.dto';
import axios, { AxiosRequestConfig } from 'axios';
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
      relations: ['branch', 'transactionItem', 'transactionItem.menuItem'],
    });
  }

  findOne(id: number): Promise<Transaction> {
    const findId = this.transactionRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'transactionItem', 'transactionItem.menuItem'],
    });
    return findId;
  }

  async create(_transaction: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.status = _transaction.status;
    transaction.table = _transaction.table;
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

  async create_payment(id: number, payTransactionDto: PayTransactionDto) {
    // @TODO : Add validation, amount should > 2000
    const transaction = await this.findOne(id);

    // @TODO: Deductions/discounts to be implemented on FE.
    const discounts = payTransactionDto.discounts || 0
    const totalAmount = transaction.transactionItem.reduce((prev, cur) => (prev + (cur.menuItem.price * cur.quantity)) , 0) - discounts
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + process.env.PAYMONGO_API_PUB_KEY
      },
    };

    const body = JSON.stringify({
      "data": {
        "attributes": {
          "amount": totalAmount * 100, // multiply to 100 because paymongo's value on 100 is 10000
          "redirect": {
            "success": payTransactionDto.redirect_success,
            "failed": payTransactionDto.redirect_failed
          },
          "type": payTransactionDto.type,
          "currency": "PHP"
        }
      }
    });

    const response = await axios.post('https://api.paymongo.com/v1/sources', 
      body, config)
    const data = response.data.data
    if(data.attributes.status === 'pending') {
      transaction.status = 'payment_on_process'
      await this.transactionRepository.save(transaction);
      return {
        redirect: data.attributes.redirect.checkout_url,
        id: data.id,
        type: data.source
      }
    }
  }
}
