import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLogsDto } from './create-inventoryLogs.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateInventoryLogsDto extends PartialType(
  CreateInventoryLogsDto,
) {
  @IsInt()
  id: ObjectId;

  @IsString()
  type: string;

  @IsInt()
  quantityLogs: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  rawGrocery_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
