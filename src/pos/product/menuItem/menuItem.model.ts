import { Schema, model, Types } from 'mongoose';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';

export interface IMenuItem extends Document {
  title: string;
  photo: string;
  price: number;
  description: string;
  cookingTime: string;
  menuCategory: Types.ObjectId[];
  storeId: number;
  store: Types.ObjectId;
  branchItem: IBranchItem[];
  transactionItem: Types.ObjectId[];
  createdAt: Date;
}

export const MenuItemSchema = new Schema<IMenuItem>({
  title: String,
  photo: String,
  price: Number,
  description: String,
  cookingTime: String,
  menuCategory: [{ type: Schema.Types.ObjectId, ref: 'MenuCategory' }],
  storeId: Number,
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  branchItem: [{ type: Schema.Types.ObjectId, ref: 'BranchItem' }],
  transactionItem: [{ type: Schema.Types.ObjectId, ref: 'TransactionItem' }],
  createdAt: { type: Date, default: Date.now },
});

export const MenuItemModel = model('MenuItem', MenuItemSchema);