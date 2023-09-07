/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BranchItemSchema } from "src/pos/branchItem/branchItem.model";
import { BranchItemService } from "src/pos/branchItem/branchItem.service";
import { MenuCategorySchema } from "src/pos/product/menuCategory/menuCategory.model";
import { MenuItemSchema } from "src/pos/product/menuItem/menuItem.model";
import { TransactionSchema } from "src/pos/transaction/transaction/transaction.model";
import { TransactionItemSchema } from "src/pos/transaction/transactionItem/transactionItem.model";
import { BranchSchema } from "../branch/branch.model";
import { DashboardController } from "./dashboard.controller";
import { Utils } from "src/utils/utils";
import { UsersSchema } from "../user/user.model";

@Module({
    imports:[MongooseModule.forFeature([
        {name: 'BranchItem', schema: BranchItemSchema},
        {name: 'Branch', schema: BranchSchema},
        {name: 'MenuItem', schema: MenuItemSchema},
        {name: 'TransactionItem', schema: TransactionItemSchema},
        {name: 'Transaction', schema: TransactionSchema},
        { name: 'MenuCategory', schema: MenuCategorySchema },
        { name: 'User', schema: UsersSchema }
    ])],
    controllers: [DashboardController],
    providers: [BranchItemService, Utils],
})

export class DashboardModule{}