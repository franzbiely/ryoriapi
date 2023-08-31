import { Schema, model, ObjectId } from 'mongoose';

export interface IReport extends Document {
  title: string;
  photo: string;
  parent_report_id: ObjectId;
  createdAt: Date;
}

export const ReportSchema = new Schema<IReport>({
  title: String,
  photo: String,
  parent_report_id: Number,
  createdAt: { type: Date, default: Date.now },
});

export const ReportModel = model('Report', ReportSchema);