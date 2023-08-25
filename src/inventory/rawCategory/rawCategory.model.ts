import { Schema, model, Types } from 'mongoose';

export interface IRawCategory extends Document {
  title: string;
  branchId: number;
  rawGrocery: Types.ObjectId[];
  branch: Types.ObjectId;
  createdAt: Date;
}


export const RawCategorySchema = new Schema<IRawCategory>({
  title: String,
  branchId: Number,
  rawGrocery: [{ type: Schema.Types.ObjectId, ref: 'RawGrocery' }],
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const RawCategoryModel = model('RawCategory', RawCategorySchema);