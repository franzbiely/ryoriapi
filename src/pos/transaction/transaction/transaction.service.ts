import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PayTransactionDto } from './dto/pay-transaction.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
  async findAll(branch_Id: ObjectId): Promise<ITransaction[]|any> {
    const response = await this.transactionModel
      .find({ branch: branch_Id })
      .populate('branch')
      .populate({
        path: 'transactionItem',
        populate: {
          path: 'menuItem'
        }
      })
      .exec();
    const newData = response.map((data) => ({
      ...data,
      total: data.transactionItem.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));
    return newData;
  }

  async findOne(id: ObjectId): Promise<ITransaction> {
    try {
      const transaction = await this.transactionModel.findOne({_id:id})
        .populate('branch')
        .populate({ path: 'transactionItem', populate: 'menuItem' }).exec();
  
      if (!transaction) {
        throw new Error('Transaction not found');
      }
  
      return transaction.toObject();
    } catch (error) {
      throw new Error('Error while fetching transaction');
    }
  }

  async getTransactionStatus(
    transaction: ITransaction | any,
  ): Promise<{ status: string } | any> {
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
        await transaction.save();
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
    sid: ObjectId,
    bid: ObjectId,
    tid: ObjectId,
  ): Promise<{ status: string } | []> {
    const transaction = await this.transactionModel
    .findOne({ branch: bid, table: tid })
    .sort({ id: -1 })
    .exec();
    if (transaction) {
      return this.getTransactionStatus(transaction);
    }
  
    return []; // Return null if no transaction is found
  }

  async getStatusById(id: ObjectId): Promise<{ status: string }> {
    const transaction = await this.transactionModel.findOne({_id:id}).exec()
    return this.getTransactionStatus(transaction);
  }

  async create(_transaction: CreateTransactionDto): Promise<ITransaction | any> {
    const transaction = new this.transactionModel({
      status: _transaction.status,
      table: _transaction.table,
      notes: _transaction.notes,
      amount: _transaction.amount,
    });

    let branch;
    if (_transaction.branch_Id) {
      branch = await this.branchModel.findOne({ _id: _transaction.branch_Id }).exec();
    }
    
    if (_transaction.branch_Id) {
      transaction.branch = branch;
    }

    
    if (!Array.isArray(_transaction.item)) {
      _transaction.item = [_transaction.item];
    }
    console.log({_transaction})
    await Promise.all(
      _transaction.item.map(async (item) => {
        const _item = JSON.parse(item);
        const menuItem = await this.menuItemModel.findOne({ _id: _item._id }).exec();

        const transactionItem = new this.transactionItemModel({
          quantity : _item.qty,
          status : 'new',
          menuItem : menuItem,
          transaction : transaction._id,
        });
        
        if (_transaction.branch_Id) {
          transactionItem.branch = branch;
        }
        await transactionItem.save();
        transaction.transactionItem.push(transactionItem)
      }),
    );
    const currentTransaction = await transaction.save();
    return currentTransaction;
  }

  async update(
    id: ObjectId,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<ITransaction | any> {
    const transaction = await this.transactionModel.findOne({_id:id}).exec();
    const { status, notes } = updateTransactionDto;
    transaction.status = status;
    transaction.notes = notes;

    if (updateTransactionDto.paymongo_pi_id) {
      transaction.paymongo_pi_id = updateTransactionDto.paymongo_pi_id;
    }

    return await transaction.save();
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.transactionModel.deleteOne({ _id : id }).exec();
    // Cascade delete.
    const resultItem = await this.transactionItemModel.deleteMany({transaction: id}).exec();

    return `Deleted ${result.deletedCount} record in transaction.
    Deleted ${resultItem.deletedCount} record in items.`;
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
    const transaction = await this.transactionModel.findOne({_id: payTransactionDto.id});
    const payment_intent_data = await this.create_payment_intent(transaction);

    transaction.status = payment_intent_data.attributes.status;
    transaction.paymongo_pi_id = payment_intent_data.id;
    transaction.amount = payTransactionDto.amount;

    await transaction.save();

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

  async getTransactionToday(branch_Id: ObjectId): Promise<ITransaction[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1); // Add one day

    const response = await this.transactionModel.find({
        branch: branch_Id,
        createdAt: { $gte: today, $lt: tomorrow }
      })
      .populate('branch')
      .populate({
        path: 'transactionItem',
        populate: {
          path: 'menuItem'
        }
    });

    const newData = response.map((data) => ({
      ...data,
      total: data.transactionItem.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));
    return newData;
  }

  async getTransactionNotToday(branch_Id: ObjectId): Promise<ITransaction[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const response = await this.transactionModel.find({
      branch: branch_Id,
      createdAt: { $lt: today}
    })
    .populate('branch')
    .populate({
      path: 'transactionItem',
      populate: {
        path: 'menuItem'
      }
  });
    const newData = response.map((data) => ({
      ...data,
      total: data.transactionItem.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));

    return newData;
  }
}
