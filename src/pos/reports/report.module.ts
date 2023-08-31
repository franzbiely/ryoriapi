/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ReportSchema } from "./report.model";

@Module({
    imports:[MongooseModule.forFeature([
        { name: 'Report', schema: ReportSchema }
        ])],
    controllers: [ReportController],
    providers: [ReportService],
})

export class ReportModule{}