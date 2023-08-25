import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PayTransactionDto } from './dto/pay-transaction.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITransaction } from './transaction.model';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransactionItem } from '../transactionItem/transactionItem.model';
@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransaction>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('TransactionItem')
    private readonly transactionItemModel: Model<ITransactionItem>,
  ) {}

  //Get All User
  async findAll(branch_Id: number): Promise<ITransaction[]|any> {
    // const response = await this.transactionModel.find({
    //   where: {
    //     branchId: branch_Id,
    //   },
    //   relations: ['branch', 'transactionItem', 'transactionItem.menuItem'],
    // });
    // const newData = response.map((data) => ({
    //   ...data,
    //   total: data.transactionItem.reduce((prev, cur) => {
    //     return prev + cur.quantity * cur.menuItem.price;
    //   }, 0),
    // }));
    // return newData;
  }

  async findOne(id: number): Promise<ITransaction> {
    try {
      const transaction = await this.transactionModel.findById(id)
        .populate('branch')
        .populate({ path: 'transactionItem', populate: 'menuItem' });
  
      if (!transaction) {
        throw new Error('Transaction not found');
      }
  
      return transaction.toObject();
    } catch (error) {
      throw new Error('Error while fetching transaction');
    }
  }

  async getTransactionStatus(
    transaction: ITransaction,
  ): Promise<{ status: string } | any> {
    // if (transaction.paymongo_pi_id) {
    //   const config: AxiosRequestConfig = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization:
    //         'Basic ' +
    //         Buffer.from(process.env.PAYMONGO_API_SCRT_KEY).toString('base64'),
    //     },
    //   };
    //   const response = await axios.get(
    //     'https://api.paymongo.com/v1/payment_intents/' +
    //       transaction.paymongo_pi_id,
    //     config,
    //   );

    //   const data = response.data.data.attributes;

    //   if (data.status === 'succeeded') {
    //     transaction.status = 'closed';
    //     await this.transactionModel.save(transaction);
    //   }

    //   return {
    //     status: data.status,
    //   };
    // } else {
    //   return {
    //     status: transaction.status,
    //   };
    // }
  }

  async getStatusByBidAndTid(
    sid: number,
    bid: number,
    tid: string,
  ): Promise<{ status: string }> {
    const transaction = await this.transactionModel.findOne({
      where: {
        branchId: bid,
        table: tid,
      },
      order: { id: 'DESC' },
    });
    return this.getTransactionStatus(transaction);
  }

  async getStatusById(id: number): Promise<{ status: string }> {
    const transaction = await this.transactionModel.findOne({
      where: {
        id: id,
      },
    });
    return this.getTransactionStatus(transaction);
  }

  async create(_transaction: CreateTransactionDto): Promise<ITransaction | any> {
    // const transaction = new Transaction();
    // transaction.status = _transaction.status;
    // transaction.table = _transaction.table;
    // transaction.notes = _transaction.notes;
    // transaction.amount = _transaction.amount;
    // let branch;
    // if (_transaction.branch_Id) {
    //   branch = await this.branchModel.findOne({
    //     where: { id: _transaction.branch_Id },
    //   });
    // }
    // if (_transaction.branch_Id) {
    //   transaction.branch = branch;
    // }

    // const currentTransaction = await this.transactionModel.save(
    //   transaction,
    // );
    // if (!Array.isArray(_transaction.item)) {
    //   _transaction.item = [_transaction.item];
    // }
    // await Promise.all(
    //   _transaction.item.map(async (item) => {
    //     const _item = JSON.parse(item);
    //     const menuItem = await this.menuItemModel.findOne({
    //       where: { id: _item.id },
    //     });

    //     const transactionItem = new TransactionItem();
    //     transactionItem.quantity = _item.qty;
    //     transactionItem.status = 'new';
    //     transactionItem.menuItem = menuItem;
    //     transactionItem.transaction = currentTransaction;
    //     if (_transaction.branch_Id) {
    //       transactionItem.branch = branch;
    //     }
    //     console.log({ transactionItem });
    //     await this.transactionItemModel.save(transactionItem);
    //   }),
    // );
    // return currentTransaction;
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<ITransaction | any> {
    // const transaction = await this.findOne(id);
    // const { status } = updateTransactionDto;
    // transaction.status = status;

    // if (updateTransactionDto.paymongo_pi_id) {
    //   transaction.paymongo_pi_id = updateTransactionDto.paymongo_pi_id;
    // }

    // return await this.transactionModel.save(transaction);
  }

  async remove(id: number): Promise<void> {
    // await this.transactionModel.delete(id);
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
    // const transaction = await this.findOne(payTransactionDto.id);
    // const payment_intent_data = await this.create_payment_intent(transaction);

    // transaction.status = payment_intent_data.attributes.status;
    // transaction.paymongo_pi_id = payment_intent_data.id;
    // transaction.amount = payTransactionDto.amount;

    // await this.transactionModel.save(transaction);

    // const payment_method_data = await this.create_payment_method(
    //   payTransactionDto,
    // );
    // const payment_intent_attach_data =
    //   await this.attach_payment_intent_to_method(
    //     payment_intent_data.id,
    //     payment_method_data.id,
    //   );

    // return {
    //   redirect: payment_intent_attach_data.attributes.next_action.redirect.url,
    // };
  }
}
