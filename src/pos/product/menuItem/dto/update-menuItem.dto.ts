import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menuItem.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  @IsString()
  description: string;

  @IsString()
  cookingTime: string;

  @IsInt()
  store_Id: number;

  @IsInt()
  category_Id: number;

  @IsString()
  createdAt: Date;
}
