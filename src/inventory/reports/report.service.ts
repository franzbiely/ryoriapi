/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) {}

    //Get All User
    findAll(): Promise<Report[]> {
        return this.reportRepository.find({});
    }

    findOne(id: number): Promise<Report>{
        const x = this.reportRepository.findOneBy({id});
        return x;
    }

    async create(_report: CreateReportDto): Promise<Report>{
        const report = new Report();
        report.title = _report.title
        report.photo = _report.photo
        return this.reportRepository.save(report);
    }

    async update(id: number, report:Report) {
        await this.reportRepository.update(id, report)
    }

    async remove(id: number): Promise<void>{
        await this.reportRepository.delete(id);
    }

}