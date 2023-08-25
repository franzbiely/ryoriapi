/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateReportDto extends PartialType(CreateReportDto) {
    @IsInt()
    id: ObjectId;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;

    @IsInt()
    parent_report_id: ObjectId;
}