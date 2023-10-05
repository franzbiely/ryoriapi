import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersSchema } from './general/user/user.model';
import { UserModule } from './general/user/user.module';
import { StoreSchema } from './general/store/store.model';
import { StoreModule } from './general/store/store.module';
import { ReviewsSchema } from './general/reviews/reviews.model';
import { ReviewsModule } from './general/reviews/reviews.module';
import { BranchSchema } from './general/branch/branch.model';
import { BranchModule } from './general/branch/branch.module';

import { CustomerModule } from './pos/customer/customer.module';

import { TransactionSchema } from './pos/transaction/transaction/transaction.model';
import { TransactionModule } from './pos/transaction/transaction/transaction.module';
import { ReportSchema } from './pos/reports/report.model';
import { MenuItemSchema } from './pos/product/menuItem/menuItem.model';
import { MenuItemModule } from './pos/product/menuItem/menuItem.module';
import { MenuCategorySchema } from './pos/product/menuCategory/menuCategory.model';
import { MenuCategoryModule } from './pos/product/menuCategory/menuCategory.module';
import { TransactionItemSchema } from './pos/transaction/transactionItem/transactionItem.model';
import { TransactionItemModule } from './pos/transaction/transactionItem/transactionItem.module';
import { BranchItemSchema } from './pos/branchItem/branchItem.model';

import { RawCategorySchema as InventoryCategory } from './inventory/rawCategory/rawCategory.model';
import { RawCategoryModule as InventoryCategoryModule } from './inventory/rawCategory/rawCategory.module';
import { ReportModule } from './pos/reports/report.module';
import { ConsumptionSchema } from './general/consumption/consumption.model';
import { ConsumptionModule } from './general/consumption/consumption.module';
import { RawGrocerySchema } from './inventory/rawGrocery/rawGrocery.model';
import { RawGroceryModule } from './inventory/rawGrocery/rawGrocery.module';
import { BranchItemModule } from './pos/branchItem/branchItem.module';
import { SocketModule } from './utils/socket/socket.module';

import { InventoryLogsModule } from './inventory/inventoryLogs/inventoryLogs.module';
import { InventoryLogsSchema } from './inventory/inventoryLogs/inventoryLogs.model';
import { DashboardModule } from './general/dashboard/dashboard.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Encryptor } from './utils/encryptor';
import { Utils } from './utils/utils';
import { TransactionArchiveModule } from './pos/transaction/transactionArchive/transactionArchive.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_CONNECTION_STRING
    ),

    // general
    AuthModule,
    ConsumptionModule,
    UserModule,
    StoreModule,
    ReviewsModule,
    BranchModule,
    DashboardModule,

    // inventory
    InventoryCategoryModule,
    RawGroceryModule,

    InventoryLogsModule,

    // pos
    // CategoryModule,
    CustomerModule,
    TransactionModule,
    ReportModule,
    MenuItemModule,
    MenuCategoryModule,
    TransactionItemModule,
    BranchItemModule,
    SocketModule,
    TransactionArchiveModule,
  ],
  controllers: [AppController],
  providers: [AppService, Encryptor, Utils],
})
export class AppModule {}
