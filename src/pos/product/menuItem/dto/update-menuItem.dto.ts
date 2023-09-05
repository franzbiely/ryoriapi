import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menuItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  @IsInt()
  id: ObjectId;

  @IsOptional()
  title: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  price: number;

  @IsOptional()
  quantity: number;

  @IsOptional()
  description: string;

  @IsOptional()
  cookingTime: string;

  @IsOptional()
  store_Id: number;

  @IsOptional()
  category_Id: number;

  @IsOptional()
  createdAt: Date;
}
