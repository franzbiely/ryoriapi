import { Schema, model, Types, ObjectId } from 'mongoose';
import { IStore } from 'src/general/store/store.model';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { IMenuCategory } from '../menuCategory/menuCategory.model';

export interface IMenuItem extends Document {
  title: string;
  photo: string;
  price: number;
  description: string;
  cookingTime: string;
  menuCategory: IMenuCategory[];
  storeId: ObjectId;
  store: IStore;
  branchItem: IBranchItem[];
  transactionItem: ITransactionItem[];
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
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
  branchItem: [{ type: Schema.Types.ObjectId, ref: 'BranchItem' }],
  transactionItem: [{ type: Schema.Types.ObjectId, ref: 'TransactionItem' }],
  createdAt: { type: Date, default: Date.now },
});

export const MenuItemModel = model('MenuItem', MenuItemSchema);