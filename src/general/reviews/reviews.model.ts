import { Schema, model, Types } from 'mongoose';

export interface IReviews extends Document {
  description: string;
  rating: number;
  branchId: number;
  branch: Types.ObjectId;
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