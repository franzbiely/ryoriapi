/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate, IsNumber } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateReviewsDto {
    @IsInt()
    id: ObjectId;

    @IsString()
    description: string;

    @IsNumber()
    rating: number;

    @IsInt()
    branch_Id: ObjectId;

    @IsDate()
    createdAt: Date;
}
