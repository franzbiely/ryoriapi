import { Schema, model, Types } from 'mongoose';
import { ObjectId } from 'typeorm';
import { IBranch } from '../branch/branch.model';

export interface IReviews extends Document {
  description: string;
  rating: number;
  branchId: ObjectId;
  branch: IBranch;
  createdAt: Date;
}

export const ReviewsSchema = new Schema<IReviews>({
  description: String,
  rating: Number,
  branchId: Number,
  branch: { type: Schema.Types.ObjectId, ref: 'Branch'},
  createdAt: { type: Date, default: Date.now },
});

export const ReviewsModel = model('Reviews', ReviewsSchema);