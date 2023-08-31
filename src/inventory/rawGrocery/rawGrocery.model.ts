import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IInventoryLogs } from '../inventoryLogs/inventoryLogs.model';
import { IRawCategory } from '../rawCategory/rawCategory.model';

export interface IRawGrocery extends Document {
  item: string;
  weight: string;
  quantity: number;
  branchId: number;
  branch: IBranch;
  rawCategory: IRawCategory[];
  inventoryLogs: IInventoryLogs[];
  createdAt: Date;
}


export const RawGrocerySchema = new Schema<IRawGrocery>({
  item: String,
  weight: String,
  quantity: Number,
  branchId: Number,
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  rawCategory: [{ type: Schema.Types.ObjectId, ref: 'RawCategory' }],
  inventoryLogs: [{ type: Schema.Types.ObjectId, ref: 'InventoryLogs' }],
  createdAt: { type: Date, default: Date.now },
});

export const RawGroceryModel = model('RawGrocery', RawGrocerySchema);