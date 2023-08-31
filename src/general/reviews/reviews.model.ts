import { Schema, model, Types } from 'mongoose';
import { IBranch } from '../branch/branch.model';

export interface IReviews extends Document {
  description: string;
  rating: number;
  branchId: number;
  branch: IBranch;
  createdAt: Date;
}

export const ReviewsSchema = new Schema<IReviews>({
  description: String,
  rating: Number,
  branchId: Number,
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ReviewsModel = model('Reviews', ReviewsSchema);