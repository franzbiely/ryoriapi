/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './general/user/user.entity';
import { UserModule } from './general/user/user.module';
import { Store } from './general/store/store.entity';
import { StoreModule } from './general/store/store.module';
import { Reviews } from './general/reviews/reviews.entity';
import { ReviewsModule } from './general/reviews/reviews.module';
import { Branch } from './general/branch/branch.entity';
import { BranchModule } from './general/branch/branch.module';

import { CustomerModule } from './pos/customer/customer.module';

import { Transaction } from './pos/transaction/transaction/transaction.entity';
import { TransactionModule } from './pos/transaction/transaction/transaction.module';
import { Report } from './pos/reports/report.entity';
import { MenuItem } from './pos/product/menuItem/menuItem.entity';
import { MenuItemModule } from './pos/product/menuItem/menuItem.module';
import { MenuCategory } from './pos/product/menuCategory/menuCategory.entity';
import { MenuCategoryModule } from './pos/product/menuCategory/menuCategory.module';
import { TransactionItem } from './pos/transaction/transactionItem/transactionItem.entity';
import { TransactionItemModule } from './pos/transaction/transactionItem/transactionItem.module';
import { BranchItem } from './pos/branchItem/branchItem.entity';

import { RawCategory as InventoryCategory } from './inventory/rawCategory/rawCategory.entity';
import { RawCategoryModule as InventoryCategoryModule } from './inventory/rawCategory/rawCategory.module';
import { ReportModule } from './pos/reports/report.module';
import { Consumption } from './general/consumption/consumption.entity';
import { ConsumptionModule } from './general/consumption/consumption.module';
import { RawGrocery } from './inventory/rawGrocery/rawInventory.entity';
import { RawGroceryModule } from './inventory/rawGrocery/rawInventory.module';
import { BranchItemModule } from './pos/branchItem/branchItem.module';
import { SocketModule } from './utils/socket/socket.module';
import { AppGateway } from './app.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        // general
        Consumption,
        Users,
        Store,
        Reviews,
        Branch,

        // inventory
        InventoryCategory,
        RawGrocery,

        // pos
        MenuItem,
        MenuCategory,
        Transaction,
        Report,
        TransactionItem,
        BranchItem,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // general
    AuthModule,
    ConsumptionModule,
    UserModule,
    StoreModule,
    ReviewsModule,
    BranchModule,

    // inventory
    InventoryCategoryModule,
    RawGroceryModule,

    // pos
    // CategoryModule,
    CustomerModule,
    TransactionModule,
    ReportModule,
    MenuItemModule,
    MenuCategoryModule,
    TransactionItemModule,
    BranchItemModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
