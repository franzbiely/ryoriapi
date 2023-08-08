import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLogsDto } from './create-inventoryLogs.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateInventoryLogsDto extends PartialType(
  CreateInventoryLogsDto,
) {
  @IsInt()
  id: number;

  @IsString()
  type: string;

  @IsInt()
  quantity: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  rawGrocery_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
