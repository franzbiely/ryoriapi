/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString ,IsInt, IsDate,IsOptional } from '@nestjs/class-validator';
// import { Foods } from 'src/entities/foods/food.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    id: number;

    @IsString()
    label: string;

    @IsString()
    image: string;

    @IsOptional()
    food: string

    @IsDate()
    createdAt: Date;
}