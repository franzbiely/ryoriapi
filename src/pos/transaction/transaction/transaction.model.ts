import { Schema, model, Types } from 'mongoose';

export interface ITransaction extends Document {
  status: string;
  table: string;
  notes: string;
  amount: number;
  paymongo_pi_id: string;
  branchId: number;
  branch: Types.ObjectId;
  transactionItem: Types.ObjectId[];
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