import { Schema, model, Types } from 'mongoose';

export interface IInventoryLogs extends Document {
  type: string;
  quantityLogs: number;
  branchId: number;
  user: Types.ObjectId;
  rawGrocery: Types.ObjectId;
  branch: Types.ObjectId;
  createdAt: Date;
}

export const InventoryLogsSchema = new Schema<IInventoryLogs>({
  type: String,
  quantityLogs: Number,
  branchId: Number,
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  rawGrocery: { type: Schema.Types.ObjectId, ref: 'RawGrocery', required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const InventoryLogsModel = model('InventoryLogs', InventoryLogsSchema);