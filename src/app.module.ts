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

import { FoodModule } from './pos/foods/food.module';
import { Foods } from './pos/foods/food.entity';
import { CustomerModule } from './pos/customer/customer.module';
import { Category } from './pos/category/category.entity';
import { CategoryModule } from './pos/category/category.module';
import { Transaction } from './pos/transaction/transaction.entity';
import { TransactionModule } from './pos/transaction/transaction.module';
import { Report } from './pos/reports/report.entity';

import { Item } from './inventory/item/item.entity';
import { Category as InventoryCategory } from './inventory/category/category.entity';
import { Transaction as InventoryTransaction } from './inventory/transaction/transaction.entity';
import { CategoryModule as InventoryCategoryModule} from './inventory/category/category.module';
import { Report as InventoryReport} from './inventory/reports/report.entity';
import { ItemModule } from './inventory/item/item.module';
import { TransactionModule as InventoryTransactionModule} from './inventory/transaction/transaction.module';
import { ReportModule as InventoryReportModule} from './inventory/reports/report.module';
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

        // inventory
        InventoryCategory,
        Item, 
        InventoryTransaction,
        InventoryReport,

        // pos
        Category,
        Foods,
        Transaction,
        Report

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
        
      // inventory
      InventoryCategoryModule,
      ItemModule,
      InventoryTransactionModule,
      InventoryReportModule,

      // pos
      CategoryModule,
      FoodModule, 
      CustomerModule,
      TransactionModule,
      ReportModule 
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
