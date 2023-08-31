import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateTransactionDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  status: string;

  @IsString()
  notes: string;

  @IsString()
  amount: number;

  @IsString()
  table: string;

  @IsInt()
  branch_Id: number;

  @IsArray()
  @IsString({ each: true })
  item: string[];

  @IsDate()
  createdAt: Date;
}
