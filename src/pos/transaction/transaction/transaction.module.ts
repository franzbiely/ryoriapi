import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Branch } from 'src/general/branch/branch.entity';
import { TransactionItem } from '../transactionItem/transactionItem.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { S3Service } from 'src/utils/S3Service';
import { SocketModule } from 'src/utils/socket/socket.module';
import { SocketService } from 'src/utils/socket/socket.service';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Branch, TransactionItem, MenuItem]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, S3Service, SocketService, AppGateway],
})
export class TransactionModule {}
