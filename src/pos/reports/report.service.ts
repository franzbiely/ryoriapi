/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
// import { Report } from "./report.entity";
import { CreateReportDto } from './dto/create-report.dto';
import { Model } from "mongoose";
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
    
      findOne(id: number): Promise<IReport> {
        return this.reportModel.findById(id).exec();
      }
    
      async create(_report: CreateReportDto): Promise<IReport> {
        const report = new this.reportModel({
          title: _report.title,
          photo: _report.photo,
        });
    
        return report.save();
      }
    
      async update(id: number, report: IReport): Promise<void> {
        await this.reportModel.findByIdAndUpdate(id, report).exec();
      }
    
      async remove(id: number): Promise<void> {
        await this.reportModel.findByIdAndDelete(id).exec();
      }
}