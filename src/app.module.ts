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
import { Outlet } from './general/outlet/outlet.entity';
import { OutletModule } from './general/outlet/outlet.module';
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

import { Item } from './inventory/item/item.entity';
import { Category as InventoryCategory } from './inventory/category/category.entity';
import { Transaction as InventoryTransaction } from './inventory/transaction/transaction.entity';
import { CategoryModule as InventoryCategoryModule } from './inventory/category/category.module';
import { Report as InventoryReport } from './inventory/reports/report.entity';
import { ItemModule } from './inventory/item/item.module';
import { TransactionModule as InventoryTransactionModule } from './inventory/transaction/transaction.module';
import { ReportModule as InventoryReportModule } from './inventory/reports/report.module';
import { ReportModule } from './pos/reports/report.module';
import { Consumption } from './general/consumption/consumption.entity';
import { ConsumptionModule } from './general/consumption/consumption.module';

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
        Outlet,
        Branch,

        // inventory
        InventoryCategory,
        Item,
        InventoryTransaction,
        InventoryReport,

        // pos
        MenuItem,
        MenuCategory,
        Transaction,
        Report,
        TransactionItem,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // general
    AuthModule,
    ConsumptionModule,
    UserModule,
    StoreModule,
    OutletModule,
    BranchModule,

    // inventory
    InventoryCategoryModule,
    ItemModule,
    InventoryTransactionModule,
    InventoryReportModule,

    // pos
    // CategoryModule,
    CustomerModule,
    TransactionModule,
    ReportModule,
    MenuItemModule,
    MenuCategoryModule,
    TransactionItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
