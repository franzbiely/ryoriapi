import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateRawGroceryDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsInt()
  quantity: number;

  @IsInt()
  branch_Id: number;

  @IsInt()
  rawCategory_Id: number;

  @IsDate()
  createdAt: Date;
}
