import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateRawCategoryDto {
  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
  @IsString()
  rawGrocery_Id: string;
}
