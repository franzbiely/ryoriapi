import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menuItem.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  @IsInt()
  id: number;

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
  category_Id: number;
  
  @IsString()
  createdAt: Date;
}
