import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateRawCategoryDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsInt()
  branch_Id: ObjectId;

  @IsDate()
  createdAt: Date;
}
