import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateMenuItemDto {
  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;

  @IsString()
  cookingTime: string;

  @IsString()
  menuCategory_Id: string;

  @IsString()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsString()
  store_Id: string;
}
