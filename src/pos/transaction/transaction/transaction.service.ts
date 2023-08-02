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
  async findAll(branch_Id: number): Promise<Transaction[]> {
    const response = await this.transactionRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'transactionItem', 'transactionItem.menuItem'],
    });
    const newData = response.map((data) => ({
      ...data,
      total: data.transactionItem.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));
    return newData;
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

  async getTransactionStatus(
    transaction: Transaction,
  ): Promise<{ status: string }> {
    if (transaction.paymongo_pi_id) {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            Buffer.from(process.env.PAYMONGO_API_SCRT_KEY).toString('base64'),
        },
      };
      const response = await axios.get(
        'https://api.paymongo.com/v1/payment_intents/' +
          transaction.paymongo_pi_id,
        config,
      );

      const data = response.data.data.attributes;

      if (data.status === 'succeeded') {
        transaction.status = 'closed';
        await this.transactionRepository.save(transaction);
      }

      return {
        status: data.status,
      };
    } else {
      return {
        status: transaction.status,
      };
    }
  }

  async getStatusByBidAndTid(
    sid: number,
    bid: number,
    tid: string,
  ): Promise<{ status: string }> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        branchId: bid,
        table: tid,
      },
      order: { id: 'DESC' },
    });
    return this.getTransactionStatus(transaction);
  }

  async getStatusById(id: number): Promise<{ status: string }> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.getTransactionStatus(transaction);
  }

  async create(_transaction: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.status = _transaction.status;
    transaction.table = _transaction.table;
    transaction.notes = _transaction.notes;
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

    if (updateTransactionDto.paymongo_pi_id) {
      transaction.paymongo_pi_id = updateTransactionDto.paymongo_pi_id;
    }

    return await this.transactionRepository.save(transaction);
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async create_payment_intent(transaction): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // @TODO: Deductions/discounts to be implemented on FE.
      const discounts = 0;
      const totalAmount =
        transaction.transactionItem.reduce(
          (prev, cur) => prev + cur.menuItem.price * cur.quantity,
          0,
        ) - discounts;
      const response = await axios.post(
        'https://api.paymongo.com/v1/payment_intents',
        JSON.stringify({
          data: {
            attributes: {
              amount: totalAmount * 100, // NOTE: Paymongo rules 100.00 = 10000, @TODO: Create a function handle this.
              payment_method_allowed: ['card', 'gcash'],
              currency: 'PHP',
            },
          },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' +
              Buffer.from(process.env.PAYMONGO_API_PUBL_KEY).toString('base64'),
          },
        },
      );

      resolve(response.data.data);
      return;
    });
  }

  async create_payment_method(
    payTransactionDto: PayTransactionDto,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await axios.post(
        'https://api.paymongo.com/v1/payment_methods',
        JSON.stringify({
          data: {
            attributes: {
              billing: {
                phone: payTransactionDto.phone,
                email: payTransactionDto.email,
                name: payTransactionDto.name,
              },
              type: 'gcash',
            },
          },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' +
              Buffer.from(process.env.PAYMONGO_API_SCRT_KEY).toString('base64'),
          },
        },
      );

      resolve(response.data.data);
      return;
    });
  }

  async attach_payment_intent_to_method(
    pi_Id: string,
    pm_Id: string,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const response = await axios.post(
        `https://api.paymongo.com/v1/payment_intents/${pi_Id}/attach`,
        JSON.stringify({
          data: {
            attributes: {
              payment_method: pm_Id,
              return_url: process.env.RYORI_FE_SUCCESS_URL,
            },
          },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' +
              Buffer.from(process.env.PAYMONGO_API_SCRT_KEY).toString('base64'),
          },
        },
      );

      resolve(response.data.data);
      return;
    });
  }

  // @TODO : Add validation, amount should > 2000
  async create_payment(payTransactionDto: PayTransactionDto) {
    const transaction = await this.findOne(payTransactionDto.id);
    const payment_intent_data = await this.create_payment_intent(transaction);

    transaction.status = payment_intent_data.attributes.status;
    transaction.paymongo_pi_id = payment_intent_data.id;
    await this.transactionRepository.save(transaction);

    const payment_method_data = await this.create_payment_method(
      payTransactionDto,
    );
    const payment_intent_attach_data =
      await this.attach_payment_intent_to_method(
        payment_intent_data.id,
        payment_method_data.id,
      );

    return {
      redirect: payment_intent_attach_data.attributes.next_action.redirect.url,
    };
  }
}
