import { Module } from '@nestjs/common';
import { TransactionItemSchema } from './transactionItem.model';
import { TransactionItemController } from './transactionItem.controller';
import { TransactionItemService } from './transactionItem.service';
import { TransactionSchema } from '../transaction/transaction.model';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TransactionItem', schema: TransactionItemSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'MenuItem', schema: MenuItemSchema },
      { name: 'Branch', schema: BranchSchema }
    ]),
  ],
  controllers: [TransactionItemController],
  providers: [TransactionItemService, Utils],
})
export class TransactionItemModule {}
