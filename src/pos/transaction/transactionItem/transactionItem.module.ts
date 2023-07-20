import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from './transactionItem.entity';
import { TransactionItemController } from './transactionItem.controller';
import { TransactionItemService } from './transactionItem.service';
import { Transaction } from '../transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionItem, Transaction])],
  controllers: [TransactionItemController],
  providers: [TransactionItemService],
})
export class TransactionItemModule {}
