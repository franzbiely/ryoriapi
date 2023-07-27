/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate, IsNumber } from '@nestjs/class-validator';

export class CreateReviewsDto {
    @IsInt()
    id: number;

    @IsString()
    description: string;

    @IsNumber()
    rating: number;

    @IsInt()
    branch_Id: number;

    @IsDate()
    createdAt: Date;
}
