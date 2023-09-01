import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  status: string;

  @IsString()
  table: string;

  @IsString()
  notes: string;

  @IsInt()
  branch_Id?: number;

  @IsOptional()
  paymongo_pi_id: ObjectId;

  @IsArray()
  @IsString({ each: true })
  item: string[];

  @IsDate()
  createdAt: Date;
}
