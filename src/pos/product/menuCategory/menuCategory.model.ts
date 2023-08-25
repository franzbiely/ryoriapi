import { Schema, model, Types } from 'mongoose';

export interface IMenuCategory extends Document {
  title: string;
  photo: string;
  storeId: number;
  menuItem: Types.ObjectId[];
  store: Types.ObjectId;
  createdAt: Date;
}

export const MenuCategorySchema = new Schema<IMenuCategory>({
  title: String,
  photo: String,
  storeId: Number,
  menuItem: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MenuCategoryModel = model('MenuCategory', MenuCategorySchema);