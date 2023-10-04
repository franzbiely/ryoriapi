import { Schema, model, Types } from 'mongoose';
import { IInventoryLogs } from 'src/inventory/inventoryLogs/inventoryLogs.model';
import { IRawCategory } from 'src/inventory/rawCategory/rawCategory.model';
import { IRawGrocery } from 'src/inventory/rawGrocery/rawGrocery.model';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';
import { ITransaction } from 'src/pos/transaction/transaction/transaction.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { IStore } from '../store/store.model';
import { IUsers } from '../user/user.model';
import { ITransactionArchive } from 'src/pos/transaction/transactionArchive/transactionArchive.model';

export interface IBranch extends Document {
  branchName: string;
  email: string;
  contactNumber: string;
  address: string;

  branchItems?: IBranchItem[];
  rawGrocerys?: IRawGrocery[];
  rawCategorys?: IRawCategory[];
  transactions?: ITransaction[];
  transactionArchive?: ITransactionArchive[];
  users?: IUsers[];
}

export const BranchSchema = new Schema<IBranch>(
  {
    branchName: String,
    email: String,
    contactNumber: String,
    address: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    transactionArchive: [{ type: Schema.Types.ObjectId, ref: 'TransactionArchive' }],
    rawGrocerys: [{ type: Schema.Types.ObjectId, ref: 'RawGrocery' }],
    branchItems: [{ type: Schema.Types.ObjectId, ref: 'BranchItem' }],
    rawCategorys: [{ type: Schema.Types.ObjectId, ref: 'RawCategory' }],
  },
  { timestamps: true },
);

export const BranchModel = model('Branch', BranchSchema);
