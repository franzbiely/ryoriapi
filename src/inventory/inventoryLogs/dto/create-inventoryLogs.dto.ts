import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateInventoryLogsDto {
  @IsString()
  type: string;

  @IsInt()
  quantityLogs: number;

  @IsString()
  user_Id: string;
  @IsDate()
  createdAt: Date;

  // Not In model
  @IsString()
  rawGrocery_Id: string;
}
