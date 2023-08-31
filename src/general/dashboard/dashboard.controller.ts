import { Controller, Get, Query } from '@nestjs/common';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransaction } from 'src/pos/transaction/transaction/transaction.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { Between } from 'typeorm';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('TransactionItem')
    private readonly transactionItemModel: Model<ITransactionItem>,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<ITransaction>,
  ) {}

  async getTransactionByStatusAndMoment(
    status: string,
    momentType,
    branchId: number,
  ) {
    return new Promise(async (resolve, reject) => {
      const startMonthly = moment().startOf(momentType).toDate();
      const endMonthly = moment().endOf(momentType).toDate();

      resolve(
        await this.transactionModel.count({
          where: {
            status: status,
            branchId,
            createdAt: Between(startMonthly, endMonthly),
          },
        }),
      );
    });
  }

  @Get()
  async getDashboardData(
    @Query('sid') store_Id,
    @Query('bid') branch_Id,
  ): Promise<any> {
    const menuItem = await this.menuItemModel.find({
      where: { storeId: store_Id },
    });
    const transactionItems = await this.transactionItemModel.find({
      where: { branch: branch_Id },
    });
    const transactions = await this.transactionModel.find({
      where: { branch: branch_Id },
    });
    const totalRevenues = transactions.reduce(
      (prev, cur) => prev + cur.amount,
      0,
    );

    const transactionNew = await this.transactionModel.count({
      where: {
        status: 'new',
        branch: branch_Id,
      },
    });
    const transactionPreparing = await this.transactionModel.count({
      where: {
        status: 'preparing',
        branch: branch_Id,
      },
    });
    const transactionDone = await this.transactionModel.count({
      where: {
        status: 'done',
        branch: branch_Id,
      },
    });

    const transactionsMonthlyServed =
      await this.getTransactionByStatusAndMoment('served', 'month', branch_Id);
    const transactionsMonthlyAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'month',
        branch_Id,
      );
    const transactionsMonthlyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'month',
        branch_Id,
      );

    const transactionsWeeklyServed = await this.getTransactionByStatusAndMoment(
      'served',
      'week',
      branch_Id,
    );
    const transactionsWeeklyAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'week',
        branch_Id,
      );
    const transactionsWeeklyCancelled =
      await this.getTransactionByStatusAndMoment(
        'cancelled',
        'week',
        branch_Id,
      );

    const transactionsTodayServed = await this.getTransactionByStatusAndMoment(
      'served',
      'day',
      branch_Id,
    );
    const transactionsTodayAwaitingPayment =
      await this.getTransactionByStatusAndMoment(
        'awaiting_payment_method',
        'day',
        branch_Id,
      );
    const transactionsTodayCancelled =
      await this.getTransactionByStatusAndMoment('cancelled', 'day', branch_Id);

    return {
      totalMenus: menuItem.length,
      totalOrders: transactionItems.length,
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
