import { Schema, model, Types } from 'mongoose';

export interface ITransactionItem extends Document {
  status: string;
  branchId: number;
  quantity: number;
  menuItem?: Types.ObjectId;
  transaction?: Types.ObjectId;
  branch?: Types.ObjectId;
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