import { Schema, model, Types, ObjectId } from 'mongoose';
import { IStore } from 'src/general/store/store.model';
import { IMenuItem } from '../menuItem/menuItem.model';

export interface IMenuCategory extends Document {
  title: string;
  photo: string;
  storeId: Types.ObjectId;
  menuItem: IMenuItem[];
  store: IStore;
  createdAt: Date;
}

export const MenuCategorySchema = new Schema<IMenuCategory>({
  title: String,
  photo: String,
  storeId: String,
  menuItem: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MenuCategoryModel = model('MenuCategory', MenuCategorySchema);