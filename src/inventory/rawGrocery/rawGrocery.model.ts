import { Schema, model, Types } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IInventoryLogs } from '../inventoryLogs/inventoryLogs.model';
import { IRawCategory } from '../rawCategory/rawCategory.model';
import { IUsers } from 'src/general/user/user.model';

export interface IRawGrocery extends Document {
  item: string;
  weight: string;
  quantity: number;

  rawCategories: IRawCategory[];
  inventoryLogs?: IInventoryLogs[];
  user: IUsers;
}


export const RawGrocerySchema = new Schema<IRawGrocery>({
  item: String,
  weight: String,
  quantity: Number,
  rawCategories: [{ type: Schema.Types.ObjectId, ref: 'RawCategory' }],
  inventoryLogs: [{ type: Schema.Types.ObjectId, ref: 'InventoryLogs' }],
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
}, {timestamps: true});

export const RawGroceryModel = model('RawGrocery', RawGrocerySchema);