import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { ITransaction } from '../transaction/transaction.model';

export interface ITransactionItem extends Document {
  status: string;
  quantity: number;
  customer_name: string;
  customer_socket: string;
  menuItem: IMenuItem;
}

export const TransactionItemSchema = new Schema<ITransactionItem>(
  {
    status: String,
    quantity: Number,
    customer_name: String,
    customer_socket: String,
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  },
  { timestamps: true },
);
