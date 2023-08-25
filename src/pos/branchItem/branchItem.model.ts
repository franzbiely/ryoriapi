import { Schema, model, Types } from 'mongoose';

export interface IBranchItem extends Document {
  quantity: number;
  branchId: number;
  menuItemId: number;
  branch: Types.ObjectId;
  menuItem: Types.ObjectId;
  createdAt: Date;
}


export const BranchItemSchema = new Schema<IBranchItem>({
  quantity: Number,
  branchId: Number,
  menuItemId: Number,
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const BranchItemModel = model('BranchItem', BranchItemSchema);