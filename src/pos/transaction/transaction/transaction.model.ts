import { Schema, model, Types, ObjectId } from 'mongoose';
import { ITransactionItem } from '../transactionItem/transactionItem.model';

export interface ITransaction extends Document {
  status: string;
  table: string;
  notes: string;
  amount: number;
  paymongo_pi_id: ObjectId;
  branchId: number;
  branch: Types.ObjectId;
  transactionItem?: ITransactionItem[];
  createdAt: Date;
}

export const TransactionSchema = new Schema<ITransaction>({
  status: String,
  table: String,
  notes: String,
  amount: Number,
  paymongo_pi_id: { type: String, default: '' },
  branchId: Number,
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  transactionItem: [{ type: Schema.Types.ObjectId, ref: 'TransactionItem' }],
  createdAt: { type: Date, default: Date.now },
});

export const TransactionModel = model('Transaction', TransactionSchema);