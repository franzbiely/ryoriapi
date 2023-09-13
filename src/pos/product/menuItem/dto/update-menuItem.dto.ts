import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menuItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  @IsOptional()
  title: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  cookingTime: string;

  @IsOptional()
  menuCategory_Id: string;

  @IsOptional()
  createdAt: Date;

  // Not in model
  @IsOptional() // This is for branchItem
  qty: number;
}
