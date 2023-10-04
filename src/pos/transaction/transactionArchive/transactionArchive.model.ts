import { Schema, model, Types, ObjectId } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { ITransactionItem } from '../transactionItem/transactionItem.model';

export interface ITransactionArchive extends Document {
  status: string;
  table: string;
  notes: string;
  amount: number;
  paymongo_pi_id: string;
  charges: number;
  discount: number;
  transactionItems: string;
}

export const TransactionArchiveSchema = new Schema<ITransactionArchive>(
  {
    status: String,
    table: String,
    notes: String,
    amount: Number,
    charges: Number,
    discount: Number,
    paymongo_pi_id: String,
    transactionItems: String,
  },
  { timestamps: true },
);

export const TransactionArchiveModel = model(
  'TransactionArchive',
  TransactionArchiveSchema,
);
