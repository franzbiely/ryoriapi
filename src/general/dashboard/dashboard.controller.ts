import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchItem } from 'src/pos/branchItem/branchItem.entity';
import { BranchItemService } from 'src/pos/branchItem/branchItem.service';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Transaction } from 'src/pos/transaction/transaction/transaction.entity';
import { TransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.entity';
import { Repository, Between } from 'typeorm';
import * as moment from 'moment';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
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
        await this.transactionRepository.count({
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
    const menuItem = await this.menuItemRepository.find({
      where: { storeId: store_Id },
    });
    const transactionItems = await this.transactionItemRepository.find({
      where: { branchId: branch_Id },
    });
    const transactions = await this.transactionRepository.find({
      where: { branchId: branch_Id },
    });
    const totalRevenues = transactions.reduce(
      (prev, cur) => prev + cur.amount,
      0,
    );

    const transactionNew = await this.transactionRepository.count({
      where: {
        status: 'new',
        branchId: branch_Id,
      },
    });
    const transactionPreparing = await this.transactionRepository.count({
      where: {
        status: 'preparing',
        branchId: branch_Id,
      },
    });
    const transactionDone = await this.transactionRepository.count({
      where: {
        status: 'done',
        branchId: branch_Id,
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
