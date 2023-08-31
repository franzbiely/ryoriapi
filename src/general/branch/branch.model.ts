import { Schema, model, Types } from 'mongoose';
import { IInventoryLogs } from 'src/inventory/inventoryLogs/inventoryLogs.model';
import { IRawCategory } from 'src/inventory/rawCategory/rawCategory.model';
import { IRawGrocery } from 'src/inventory/rawGrocery/rawGrocery.model';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';
import { ITransaction } from 'src/pos/transaction/transaction/transaction.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { IStore } from '../store/store.model';
import { IUsers } from '../user/user.model';

export interface IBranch extends Document {
    branchName: string;
    email: string;
    contactNumber: string;
    address: string;
    store: IStore;
    storeId: number;
    user: IUsers[];
    transaction: ITransaction[];
    rawGrocery: IRawGrocery[];
    branchItem: IBranchItem[];
    rawCategory: IRawCategory[];
    transactionItem: ITransactionItem[];
    inventoryLogs: IInventoryLogs[];
    createdAt: Date;
}

export const BranchSchema = new Schema<IBranch>({
    branchName: String,
    email: String,
    contactNumber: String,
    address: String,
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    storeId: Number,
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    transaction: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    rawGrocery: [{ type: Schema.Types.ObjectId, ref: 'RawGrocery' }],
    branchItem: [{ type: Schema.Types.ObjectId, ref: 'BranchItem' }],
    rawCategory: [{ type: Schema.Types.ObjectId, ref: 'RawCategory' }],
    transactionItem: [{ type: Schema.Types.ObjectId, ref: 'TransactionItem' }],
    inventoryLogs: [{ type: Schema.Types.ObjectId, ref: 'InventoryLogs' }],
    createdAt: { type: Date, default: Date.now },
});

export const BranchModel = model('Branch', BranchSchema);