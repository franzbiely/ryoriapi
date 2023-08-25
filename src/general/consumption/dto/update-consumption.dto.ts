/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionDto } from './create-consumption.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateConsumptionDto extends PartialType(CreateConsumptionDto) {
    @IsInt()
    id: ObjectId;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;

    @IsInt()
    parent_consumption_id: ObjectId;
}