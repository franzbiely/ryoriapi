/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;

    @IsInt()
    parent_category_id: number;
}