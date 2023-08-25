import { Schema, model, Types } from 'mongoose';

export interface IStore extends Document {
  storeName: string;
  appId: string;
  appSecret: string;
  branch: Types.ObjectId[];
  photo: string;
  user: Types.ObjectId[];
  menuItem: Types.ObjectId[];
  menuCategory: Types.ObjectId[];
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