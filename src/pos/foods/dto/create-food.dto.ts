/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate,IsOptional } from '@nestjs/class-validator';

export class CreateFoodDto {
    @IsInt()
    id: number;

    @IsString()
    foodName: string;

    @IsString()
    price: string;

    @IsOptional()
    category:string;

    @IsDate()
    createdAt: Date;
}
