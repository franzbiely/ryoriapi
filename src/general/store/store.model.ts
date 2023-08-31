import { Schema, model, Types } from 'mongoose';
import { IMenuCategory } from 'src/pos/product/menuCategory/menuCategory.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { IBranch } from '../branch/branch.model';
import { IUsers } from '../user/user.model';

export interface IStore extends Document {
  storeName: string;
  appId: string;
  appSecret: string;
  branch: IBranch[];
  photo: string;
  user: IUsers[];
  menuItem: IMenuItem[];
  menuCategory: IMenuCategory[];
  createdAt: Date;
}

export const StoreSchema = new Schema<IStore>({
  storeName: String,
  appId: String,
  appSecret: String,
  branch: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
  photo: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  menuItem: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  menuCategory: [{ type: Schema.Types.ObjectId, ref: 'MenuCategory' }],
  createdAt: { type: Date, default: Date.now },
});

export const StoreModel = model('Store', StoreSchema);