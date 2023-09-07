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
  menuCategories?: IMenuCategory[];
}

export const MenuItemSchema = new Schema<IMenuItem>({
  title: String,
  photo: String,
  price: Number,
  description: String,
  cookingTime: String,
  menuCategories: [{ type: Schema.Types.ObjectId, ref: 'MenuCategory' }]
}, {timestamps: true});

export const MenuItemModel = model('MenuItem', MenuItemSchema);