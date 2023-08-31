import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransaction } from '../transaction/transaction.model';

export interface ITransactionItem extends Document {
  status: string;
  branchId: number;
  quantity: number;
  menuItem?: IMenuItem;
  transaction?: ITransaction;
  branch?: IBranch;
  createdAt: Date;
}


export const TransactionItemSchema = new Schema<ITransactionItem>({
  status: String,
  branchId: Number,
  quantity: Number,
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
  transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch' },
  createdAt: { type: Date, default: Date.now },
});