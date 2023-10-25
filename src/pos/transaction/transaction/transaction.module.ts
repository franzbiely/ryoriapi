import { Module } from '@nestjs/common';
import { TransactionSchema } from './transaction.model';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { TransactionItemSchema } from '../transactionItem/transactionItem.model';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { S3Service } from 'src/utils/S3Service';
// import { SocketService } from 'src/utils/socket/socket.service';
import { SocketGateway } from 'src/utils/socket/socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';
import { TransactionArchiveSchema } from '../transactionArchive/transactionArchive.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Branch', schema: BranchSchema },
      { name: 'TransactionItem', schema: TransactionItemSchema },
      { name: 'MenuItem', schema: MenuItemSchema },
      { name: 'TransactionArchive', schema: TransactionArchiveSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, S3Service, SocketGateway, Utils],
})
export class TransactionModule {}
