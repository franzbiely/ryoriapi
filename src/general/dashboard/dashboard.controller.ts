import { Controller, Get, Query } from '@nestjs/common';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransaction } from 'src/pos/transaction/transaction/transaction.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { Between } from 'typeorm';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStore } from '../store/store.model';
import { IBranch } from '../branch/branch.model';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('TransactionItem')
    private readonly transactionItemModel: Model<ITransactionItem>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransaction>,
  ) {}

  async getTransactionByStatusAndMoment(
    status: string,
    momentType,
    transactions: ITransaction[]
  ) {
    const startMonthly = moment().startOf(momentType).toDate();
    const endMonthly = moment().endOf(momentType).toDate();
    return transactions && transactions.length > 0 && 
      transactions.filter(item => {
        const createdAtDate = moment(item['createdAt']);
        return createdAtDate.isBetween(startMonthly, endMonthly, null, '[]') && item.status===status; // '[]' includes both start and end dates
      });
  }

  @Get()
  async getDashboardData(
    @Query('sid') store_Id,
    @Query('bid') branch_Id,
  ): Promise<any> {
    const menuItems = (await this.storeModel.findOne({ _id: store_Id }, 'menuItems').populate('menuItems').lean()).menuItems;

    const branch = await this.branchModel.findOne({ _id: branch_Id}).populate({
      path: 'transactions',
      populate: {
        path: 'transactionItems',
        populate: {
          path:'menuItem',
        },
      }
    });
    const transactions = branch.transactions
    const totalRevenues = transactions.reduce(
      (prev, cur) => {
        const amount = cur.transactionItems.reduce((prev2, cur2) => {
          if(cur2.menuItem) {
            return prev2 + cur2.menuItem.price * cur2.quantity
          }
        }, 0);
        return prev + (amount + (cur.charges || 0) - (cur.discount || 0))
      },
      0,
    );

    const transactionNew = transactions.filter(b => b.status === 'new').length;
    const transactionPreparing = transactions.filter(b => b.status === 'preparing').length
    const transactionDone = transactions.filter(b => b.status === 'done').length

    const transactionsMonthlyServed =
      await this.getTransactionByStatusAndMoment('served', 'month', transactions);
    
      
    const transactionsMonthlyAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'month',
        transactions,
      );
    const transactionsMonthlyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'month',
        transactions,
      );
      
    const transactionsWeeklyServed = await this.getTransactionByStatusAndMoment(
      'served',
      'week',
      transactions,
    );
    const transactionsWeeklyAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'week',
        transactions,
      );
    const transactionsWeeklyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'week',
        transactions,
      );

    const transactionsTodayServed = await this.getTransactionByStatusAndMoment(
      'served',
      'day',
      transactions,
    );
    const transactionsTodayAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'day',
        transactions,
      );
    const transactionsTodayCancelled =
      await this.getTransactionByStatusAndMoment('cancelled', 'day', transactions);

    return {
      totalMenus: menuItems.length,
      totalOrders: transactions.length,
      totalCustomers: transactions.length,
      totalRevenues,
      orderSummary: {
        monthly: {
          new: transactionNew,
          preparing: transactionPreparing,
          served: transactionsMonthlyServed,
          awaiting_payment: transactionsMonthlyAwaitingPayment,
          cancelled: transactionsMonthlyCancelled,
          done: transactionDone,
        },
        weekly: {
          new: transactionNew,
          preparing: transactionPreparing,
          served: transactionsWeeklyServed,
          awaiting_payment: transactionsWeeklyAwaitingPayment,
          cancelled: transactionsWeeklyCancelled,
          done: transactionDone,
        },
        today: {
          new: transactionNew,
          preparing: transactionPreparing,
          served: transactionsTodayServed,
          awaiting_payment: transactionsTodayAwaitingPayment,
          cancelled: transactionsTodayCancelled,
          done: transactionDone,
        },
      },
    };
  }
}
