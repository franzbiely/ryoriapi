/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
// import { Report } from "./report.entity";
import { CreateReportDto } from './dto/create-report.dto';
import { Model, ObjectId } from "mongoose";
import { IReport } from "./report.model";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ReportService {
    constructor(
        @InjectModel('Report')
        private reportModel: Model<IReport>,
    ) {}

    //Get All User
    findAll(): Promise<IReport[]> {
        return this.reportModel.find().exec();
      }
    
      findOne(id: ObjectId): Promise<IReport> {
        return this.reportModel.findOne({_id:id}).exec();
      }
    
      async create(_report: CreateReportDto): Promise<IReport> {
        const report = new this.reportModel({
          title: _report.title,
          photo: _report.photo,
        });
    
        await report.save();
        return report
      }
    
      async update(id: ObjectId, report: IReport): Promise<void> {
        await this.reportModel.findByIdAndUpdate(id, report).exec();
      }
    
      async remove(id: ObjectId): Promise<string | void> {
        const result = await this.reportModel.deleteOne({ _id : id }).exec();
        return `Deleted ${result.deletedCount} record`;
      }
}