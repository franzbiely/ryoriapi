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
    transactions: ITransaction[],
  ) {
    const startMonthly = moment().startOf(momentType).toDate();
    const endMonthly = moment().endOf(momentType).toDate();
    const result =
      transactions &&
      transactions.length > 0 &&
      transactions.filter((item) => {
        const createdAtDate = moment(item['createdAt']);
        return (
          createdAtDate.isBetween(startMonthly, endMonthly, null, '[]') &&
          item.status === status
        ); // '[]' includes both start and end dates
      });
    return result.length;
  }

  @Get()
  async getDashboardData(
    @Query('sid') store_Id,
    @Query('bid') branch_Id,
  ): Promise<any> {
    const menuItems = (
      await this.storeModel
        .findOne({ _id: store_Id }, 'menuItems')
        .populate('menuItems')
        .lean()
    ).menuItems;

    const branch = await this.branchModel
      .findOne({ _id: branch_Id })
      .populate({
        path: 'transactions',
        populate: {
          path: 'transactionItems',
          populate: {
            path: 'menuItem',
          },
        },
      })
      .populate('transactionArchive');
    const transactions = branch.transactions;
    const transactionArchives = branch.transactionArchive;
    const totalRevenues = transactions.reduce((prev, cur) => {
      const amount = cur.transactionItems.reduce((prev2, cur2) => {
        if (cur2.menuItem) {
          return prev2 + cur2.menuItem.price * cur2.quantity;
        } else {
          return prev2;
        }
      }, 0);
      return prev + (amount + (cur.charges || 0) - (cur.discount || 0));
    }, 0);

    const transactionMonthlyDraft = await this.getTransactionByStatusAndMoment(
      'draft',
      'month',
      transactions,
    );

    const transactionMonthlyCooking =
      await this.getTransactionByStatusAndMoment(
        'cooking',
        'month',
        transactions,
      );

    const transactionsMonthlyServed =
      await this.getTransactionByStatusAndMoment(
        'served',
        'month',
        transactions,
      );

    const transactionsMonthlyAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'month',
        transactions,
      );

    const transactionMonthlyComplete =
      await this.getTransactionByStatusAndMoment(
        'complete',
        'month',
        transactions,
      );
    const transactionsMonthlyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'month',
        transactions,
      );

    const transactionWeeklyDraft = await this.getTransactionByStatusAndMoment(
      'draft',
      'week',
      transactions,
    );

    const transactionWeeklyCooking = await this.getTransactionByStatusAndMoment(
      'cooking',
      'week',
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
    const transactionWeeklyComplete =
      await this.getTransactionByStatusAndMoment(
        'complete',
        'week',
        transactions,
      );
    const transactionsWeeklyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'week',
        transactions,
      );

    const transactionTodayDraft = await this.getTransactionByStatusAndMoment(
      'draft',
      'month',
      transactions,
    );
    const transactionTodayCooking = await this.getTransactionByStatusAndMoment(
      'draft',
      'day',
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

    const transactionTodayComplete = await this.getTransactionByStatusAndMoment(
      'complete',
      'day',
      transactions,
    );
    const transactionsTodayCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'day',
        transactions,
      );

    return {
      consumption: {
        limit: branch.limit,
        used: branch.used,
      },
      totalMenus: menuItems.length,
      totalOrders: transactions.length + transactionArchives.length,
      totalCustomers: transactions.length + transactionArchives.length,
      totalRevenues,
      orderSummary: {
        monthly: {
          draft: transactionMonthlyDraft,
          cooking: transactionMonthlyCooking,
          served: transactionsMonthlyServed,
          awaiting_payment: transactionsMonthlyAwaitingPayment,
          cancelled: transactionsMonthlyCancelled,
          complete: transactionMonthlyComplete,
        },
        weekly: {
          draft: transactionWeeklyDraft,
          cooking: transactionWeeklyCooking,
          served: transactionsWeeklyServed,
          awaiting_payment: transactionsWeeklyAwaitingPayment,
          cancelled: transactionsWeeklyCancelled,
          complete: transactionWeeklyComplete,
        },
        today: {
          draft: transactionTodayDraft,
          cooking: transactionTodayCooking,
          served: transactionsTodayServed,
          awaiting_payment: transactionsTodayAwaitingPayment,
          cancelled: transactionsTodayCancelled,
          complete: transactionTodayComplete,
        },
      },
    };
  }
}
