import { Module } from '@nestjs/common';
import { TransactionArchiveSchema } from './transactionArchive.model';
import { TransactionArchiveController } from './transactionArchive.controller';
import { TransactionArchiveService } from './transactionArchive.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { TransactionItemSchema } from '../transactionItem/transactionItem.model';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { S3Service } from 'src/utils/S3Service';

import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';
import { TransactionSchema } from '../transaction/transaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TransactionArchive', schema: TransactionArchiveSchema },
      { name: 'Branch', schema: BranchSchema },
      { name: 'TransactionItem', schema: TransactionItemSchema },
      { name: 'MenuItem', schema: MenuItemSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionArchiveController],
  providers: [
    TransactionArchiveService,
    S3Service,
    Utils,
  ],
})
export class TransactionArchiveModule {}
