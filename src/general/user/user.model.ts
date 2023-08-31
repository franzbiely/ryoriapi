import { Schema, model, Types, ObjectId } from 'mongoose';
import { IInventoryLogs } from 'src/inventory/inventoryLogs/inventoryLogs.model';
import { IBranch } from '../branch/branch.model';
import { IStore } from '../store/store.model';

export interface IUsers extends Document {
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userPhoto: string;
  address: string;
  storeId: number;
  store?: IStore;
  branch: IBranch[];
  inventoryLogs: IInventoryLogs[];
  createdAt: Date;
}

export const UsersSchema = new Schema<IUsers>({
  role: String,
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  userPhoto: String,
  address: String,
  storeId: Number,
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: false },
  branch: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
  inventoryLogs: [{ type: Schema.Types.ObjectId, ref: 'InventoryLogs' }],
  createdAt: { type: Date, default: Date.now },
});

export const UsersModel = model('Users', UsersSchema);