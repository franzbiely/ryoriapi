import { Schema, model, Types, ObjectId } from 'mongoose';
import { IBranch } from 'src/general/branch/branch.model';
import { IMenuItem } from '../product/menuItem/menuItem.model';
import { IUsers } from 'src/general/user/user.model';

export interface IBranchItem extends Document {
  quantity: number;

  menuItem: IMenuItem;
  user: IUsers;
}


export const BranchItemSchema = new Schema<IBranchItem>({
  quantity: Number,
  
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
}, {timestamps: true});

export const BranchItemModel = model('BranchItem', BranchItemSchema);