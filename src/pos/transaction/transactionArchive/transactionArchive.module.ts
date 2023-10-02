import { Module } from '@nestjs/common';
import { TransactionArchiveSchema } from './transactionArchive.model';
import { TransactionArchiveController } from './transactionArchive.controller';
import { TransactionArchiveService } from './transactionArchive.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { TransactionItemSchema } from '../transactionItem/transactionItem.model';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { S3Service } from 'src/utils/S3Service';
import { SocketService } from 'src/utils/socket/socket.service';
import { AppGateway } from 'src/app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';
import { TransactionSchema } from '../transaction/transaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Branch', schema: BranchSchema },
      { name: 'TransactionItem', schema: TransactionItemSchema },
      { name: 'MenuItem', schema: MenuItemSchema },
    ]),
  ],
  controllers: [TransactionArchiveController],
  providers: [
    TransactionArchiveService,
    S3Service,
    SocketService,
    AppGateway,
    Utils,
  ],
})
export class TransactionArchiveModule {}
