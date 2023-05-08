/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;

    @IsInt()
    parent_item_id: number;
}