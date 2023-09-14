import { PartialType } from '@nestjs/mapped-types';
import { CreateRawGroceryDto } from './create-rawInventory.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateRawGroceryDto extends PartialType(CreateRawGroceryDto) {
  @IsOptional()
  item: string;

  @IsOptional()
  weight: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  rawCategory_Id: string;

  @IsOptional()
  inventoryLogs_Id: string;

  @IsOptional()
  user_Id: string;

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsOptional()
  branch_Id: string;
}
