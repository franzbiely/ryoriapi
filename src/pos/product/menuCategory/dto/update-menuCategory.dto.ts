import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuCategoryDto } from './create-menuCategory.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsString()
  store_Id: string;

  @IsString()
  createdAt: Date;
}
