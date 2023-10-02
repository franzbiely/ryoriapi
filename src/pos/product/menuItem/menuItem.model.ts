import { Schema, model, Types, ObjectId } from 'mongoose';
import { IStore, StoreModel } from 'src/general/store/store.model';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';
import { ITransactionItem } from 'src/pos/transaction/transactionItem/transactionItem.model';
import { IMenuCategory } from '../menuCategory/menuCategory.model';
import { IUsers } from 'src/general/user/user.model';

export interface IMenuItem extends Document {
  title: string;
  photo: string;
  price: number;
  description: string;
  cookingTime: string;
  user: IUsers;
  menuCategories?: IMenuCategory[];
}

export const MenuItemSchema = new Schema<IMenuItem>({
  title: String,
  photo: String,
  price: Number,
  description: String,
  cookingTime: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  menuCategories: [{ type: Schema.Types.ObjectId, ref: 'MenuCategory' }]
}, {timestamps: true});

export const MenuItemModel = model('MenuItem', MenuItemSchema);