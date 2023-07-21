import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Branch } from 'src/general/branch/branch.entity';
import { TransactionItem } from '../transactionItem/transactionItem.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Branch, TransactionItem, MenuItem]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
