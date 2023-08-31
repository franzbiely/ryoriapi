import { PartialType } from '@nestjs/mapped-types';
import { CreateRawGroceryDto } from './create-rawInventory.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateRawGroceryDto extends PartialType(CreateRawGroceryDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsInt()
  quantity: number;

  @IsOptional()
  rawCategory_Id: ObjectId;

  @IsDate()
  createdAt: Date;
}
