import { Schema, model, Types } from 'mongoose';

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
  store?: Types.ObjectId;
  branch: Types.ObjectId[];
  inventoryLogs: Types.ObjectId[];
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