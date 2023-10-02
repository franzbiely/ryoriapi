import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PayTransactionDto } from './dto/pay-transaction.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { ITransaction } from './transaction.model';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransactionItem } from '../transactionItem/transactionItem.model';
import { Utils } from 'src/utils/utils';
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
    private readonly utils: Utils
  ) {}

  //Get All User
  async findAll(branch_Id: ObjectId): Promise<ITransaction[]|any> {
    const response = await this.branchModel.findOne({_id: branch_Id})
      .populate({
        path: 'transactions',
        populate: {
          path: 'transactionItems',
          populate: {
            path: 'menuItem'
          }
        }
      }).lean();
    const newData = response.transactions.map((data) => ({
      ...data,
      total: data.transactionItems.reduce((prev, cur) => {
        return prev + cur.quantity * cur.menuItem.price;
      }, 0),
    }));
    return newData;
  }

  async findOne(id: ObjectId): Promise<ITransaction> {
    try {
      const transaction = await this.transactionModel.findOne({_id:id})
        .populate({ 
          path: 'transactionItems', 
          populate: {
            path: 'menuItem' 
          }
        }).exec();
  
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
        ...transaction,
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
    bid: string,
    tid: ObjectId,
  ) {
    const branch = await this.branchModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(bid),
        },
      },
      {
        $lookup: {
          from: 'transactions',
          localField: 'transactions',
          foreignField: '_id',
          as: 'transaction',
        },
      },
      {
        $unwind: '$transaction', 
      },
      {
        $match: {
          'transaction.table': tid,
        },
      },
      {
        $lookup : {
            from: "transactionitems",
            localField: "transaction.transactionItems",
            foreignField: "_id",
            as : "transaction.transactionItems"
        }
      },
    ], {
      allowDiskUse: false
    })
    if(branch.length > 0) {
      const transaction = branch[0].transaction;
      
      const _transaction = await this.transactionModel.findOne({_id: transaction._id})
        .populate({
          path: 'transactionItems',
          populate: {
            path: 'menuItem'
          }
        }).lean()
      ;

      if (_transaction) {
        return {
          ..._transaction,
          ...this.getTransactionStatus(_transaction)
        }
      }
    }

    return []; // Return null if no transaction is found
  }

  async getStatusById(id: ObjectId): Promise<{ status: string }> {
    const transaction = await this.transactionModel.findOne({_id:id}).exec()
    return this.getTransactionStatus(transaction);
  }

  async updateTransItems({_transaction, transaction, branch}) {
      if (!Array.isArray(_transaction.item)) {
        _transaction.item = [_transaction.item]
      }
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
          
          await transactionItem.save();
          transaction.transactionItems.push(transactionItem)
        }),
      );
      const currentTransaction = await transaction.save();
      if (_transaction.branch_Id) {
        branch.transactions = await this.utils.pushWhenNew(branch.transactions, transaction);
        branch.save()
      }
      return currentTransaction;
  }
  async create(_transaction: CreateTransactionDto): Promise<ITransaction | any> {

    // TODO : Refactor this to aggregate
    // Check if bid and tid has already transaction, if yes then just add the transactionItem to the transaction.
    const branch = await this.branchModel
      .findOne({_id: _transaction.branch_Id})
      .populate('transactions')
    const existingTransaction = branch.transactions.find(transaction => transaction.table === _transaction.table)
    
    if(existingTransaction) {
      const transaction = await this.transactionModel.findOne({_id: existingTransaction['_id']});
      return this.updateTransItems({transaction, _transaction, branch})
    }
    else {
      const transaction = new this.transactionModel({
        status: _transaction.status,
        table: _transaction.table,
        notes: _transaction.notes,
      });
      return this.updateTransItems({_transaction, transaction, branch})
    }
  }

  async update(
    id: ObjectId,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<ITransaction | any> {
    const transaction = await this.transactionModel.findOne({_id:id}).exec();
    console.log({updateTransactionDto})
    transaction.status = updateTransactionDto.status || transaction.status;
    transaction.notes = updateTransactionDto.notes || transaction.notes;
    transaction.charges = updateTransactionDto.charges || transaction.charges;
    transaction.discount = updateTransactionDto.discount || transaction.discount;

    if (updateTransactionDto.paymongo_pi_id) {
      transaction.paymongo_pi_id = updateTransactionDto.paymongo_pi_id;
    }
    console.log({transaction})
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
      const totalAmount =
        transaction.transactionItems.reduce(
          (prev, cur) => prev + cur.menuItem.price * cur.quantity,
          0,
        ) - (transaction.discount || 0) + (transaction.charges || 0);
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
    const transaction = await this.transactionModel.findOne({_id: payTransactionDto.id})
    .populate({
      path: 'transactionItems',
      populate: {
        path: 'menuItem'
      }
    })
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

  async getTransactionToday(branch_Id: string): Promise<ITransaction[] | any> {

    const response = await this.branchModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(branch_Id),
        },
      },
      {
        $lookup: {
          from: 'transactions',
          localField: 'transactions',
          foreignField: '_id',
          as: 'transaction'
        },
      },
      {
        $unwind: '$transaction', // Unwind the 'nested' array
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $gte: ['$transaction.createdAt', new Date(new Date().setHours(0, 0, 0, 0))],
              },
              {
                $lt: ['$transaction.createdAt', new Date(new Date().setHours(23, 59, 59, 999))],
              },
            ],
          },
        },
      }
    ])

    if(response.length > 0) {
      return await Promise.all(response.map(async item => {
        const _transaction = await this.transactionModel.findOne({_id: item.transaction._id})
          .populate({
            path: 'transactionItems',
            populate: {
              path: 'menuItem'
            }
          }).lean()
        return {
          ..._transaction
        }
      }))
    }
    else {
      throw new NotFoundException(`Transactions from branch id ${branch_Id} today not found`);
    }
  }

  async getTransactionNotToday(branch_Id: string): Promise<ITransaction[]| any> {

    const response = await this.branchModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(branch_Id),
        },
      },
      {
        $lookup: {
          from: 'transactions',
          localField: 'transactions',
          foreignField: '_id',
          as: 'transaction'
        },
      },
      {
        $unwind: '$transaction', // Unwind the 'nested' array
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $lte: ['$transaction.createdAt', new Date(new Date().setHours(0, 0, 0, 0))],
              },
            ],
          },
        },
      }
    ])

    if(response.length > 0) {
      return await Promise.all(response.map(async item => {
        const _transaction = await this.transactionModel.findOne({_id: item.transaction._id})
          .populate({
            path: 'transactionItems',
            populate: {
              path: 'menuItem'
            }
          }).lean()
        return {
          ..._transaction
        }
      }))
    }
    else {
      throw new NotFoundException(`Transactions from branch id ${branch_Id} today not found`);
    }
  }
}
