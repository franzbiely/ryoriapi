import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IUsers } from 'src/general/user/user.model';
import { IRawGrocery } from '../rawGrocery/rawGrocery.model';

export interface IInventoryLogs extends Document {
  type: string;
  quantityLogs: number;
  user: IUsers;
}

export const InventoryLogsSchema = new Schema<IInventoryLogs>({
  type: String,
  quantityLogs: Number,
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
}, {timestamps: true});

export const InventoryLogsModel = model('InventoryLogs', InventoryLogsSchema);