import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionArchiveDto } from './create-transactionArchive.dto';
import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTransactionArchiveDto extends PartialType(
  CreateTransactionArchiveDto,
) {
  @IsOptional()
  status: string;

  @IsOptional()
  table: string;

  @IsOptional()
  notes: string;

  @IsOptional()
  amount: number;

  @IsOptional()
  charges: number;

  @IsOptional()
  discount: number;

  @IsOptional()
  paymongo_pi_id: string;

  @IsArray()
  @IsOptional({ each: true })
  transactionItem_Id: string[];

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
}
