import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateMenuCategoryDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsString()
  createdAt: Date;

  // Not in the database
  @IsString()
  store_Id: string;
  @IsString()
  menuItem_Id: string;

}
