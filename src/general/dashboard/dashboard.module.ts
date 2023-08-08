/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchItem } from "src/pos/branchItem/branchItem.entity";
import { BranchItemService } from "src/pos/branchItem/branchItem.service";
import { MenuItem } from "src/pos/product/menuItem/menuItem.entity";
import { Transaction } from "src/pos/transaction/transaction/transaction.entity";
import { TransactionItem } from "src/pos/transaction/transactionItem/transactionItem.entity";
import { Branch } from "../branch/branch.entity";
import { DashboardController } from "./dashboard.controller";

@Module({
    imports:[TypeOrmModule.forFeature([BranchItem, Branch, MenuItem, TransactionItem, Transaction])],
    controllers: [DashboardController],
    providers: [BranchItemService],
})

export class DashboardModule{}