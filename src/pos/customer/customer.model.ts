import { Schema, model } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  lastName: string;
  createdAt: Date;
}

export const CustomerSchema = new Schema<ICustomer>({
  name: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
});

export const CustomerModel = model('Customer', CustomerSchema);