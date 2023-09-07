import { Schema, model, Types } from 'mongoose';
import { IMenuCategory } from 'src/pos/product/menuCategory/menuCategory.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { IBranch } from '../branch/branch.model';
import { IUsers } from '../user/user.model';

export interface IStore extends Document {
  storeName: string;
  appId: string;
  appSecret: string;
  photo: string;

  user: IUsers;
  branches?: IBranch[];
  menuItems?: IMenuItem[];
  menuCategories?: IMenuCategory[];
}

export const StoreSchema = new Schema<IStore>({
  storeName: String,
  appId: String,
  appSecret: String,
  branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
  photo: String,
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  menuCategories: [{ type: Schema.Types.ObjectId, ref: 'MenuCategory' }],
}, {timestamps: true});

export const StoreModel = model('Store', StoreSchema);