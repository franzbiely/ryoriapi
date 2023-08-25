/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewsDto } from './create-reviews.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class UpdateReviewsDto extends PartialType(CreateReviewsDto) {
    @IsInt()
    id: ObjectId;

    @IsString()
    description: string;

    @IsNumber()
    rating: number;

    @IsDate()
    createdAt: Date;
}