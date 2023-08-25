import { Schema, model } from 'mongoose';

export interface IConsumption extends Document {
  title: string;
  photo: string;
  parent_consumption_id: number;
  createdAt: Date;
}

export const ConsumptionSchema = new Schema<IConsumption>({
  title: String,
  photo: String,
  parent_consumption_id: Number,
  createdAt: { type: Date, default: Date.now },
});

export const ConsumptionModel = model('Consumption', ConsumptionSchema);