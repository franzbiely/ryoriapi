import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLogsDto } from './create-inventoryLogs.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateInventoryLogsDto extends PartialType(
  CreateInventoryLogsDto,
) {
  @IsOptional()
  type: string;

  @IsOptional()
  quantityLogs: number;

  @IsOptional()
  user_Id: string;

  @IsDate()
  createdAt: Date;
}
