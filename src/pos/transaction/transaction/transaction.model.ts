import { Schema, model, Types, ObjectId } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { ITransactionItem } from '../transactionItem/transactionItem.model';

export interface ITransaction extends Document {
  status: string;
  table: string;
  notes: string;
  amount: number;
  paymongo_pi_id: string;
  charges: number;
  discount: number;
  transactionItems: ITransactionItem[];
  branch: IBranch;
}

export const TransactionSchema = new Schema<ITransaction>(
  {
    status: String,
    table: String,
    notes: String,
    amount: Number,
    charges: Number,
    discount: Number,
    paymongo_pi_id: { type: String, default: '' },
    transactionItems: [
      { type: Schema.Types.ObjectId, ref: 'TransactionItem', required: true },
    ],
    branch: [{ type: Schema.Types.ObjectId, ref: 'Branch', required: true }],
  },
  { timestamps: true },
);

export const TransactionModel = model('Transaction', TransactionSchema);
