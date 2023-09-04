import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IUsers } from 'src/general/user/user.model';
import { IRawGrocery } from '../rawGrocery/rawGrocery.model';

export interface IInventoryLogs extends Document {
  type: string;
  quantityLogs: number;
  branchId: number;
  user: IUsers;
  rawGrocery: IRawGrocery;
  branch: IBranch;
  createdAt: Date;
}

export const InventoryLogsSchema = new Schema<IInventoryLogs>({
  type: String,
  quantityLogs: Number,
  branchId: Number,
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  rawGrocery: { type: Schema.Types.ObjectId, ref: 'RawGrocery'},
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const InventoryLogsModel = model('InventoryLogs', InventoryLogsSchema);