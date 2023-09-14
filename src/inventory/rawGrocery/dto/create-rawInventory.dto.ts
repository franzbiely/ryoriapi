import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateRawGroceryDto {
  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsInt()
  quantity: number;

  @IsString()
  rawCategory_Id: string;

  @IsString()
  inventoryLogs_Id: string;

  @IsString()
  user_Id: string;

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
}
