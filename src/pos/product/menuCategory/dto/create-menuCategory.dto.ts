import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateMenuCategoryDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsInt()
  store_Id: number;

  @IsString()
  createdAt: Date;
}
