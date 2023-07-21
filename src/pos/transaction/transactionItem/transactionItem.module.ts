import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from './transactionItem.entity';
import { TransactionItemController } from './transactionItem.controller';
import { TransactionItemService } from './transactionItem.service';
import { Transaction } from '../transaction/transaction.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionItem, Transaction, MenuItem, Branch]),
  ],
  controllers: [TransactionItemController],
  providers: [TransactionItemService],
})
export class TransactionItemModule {}
