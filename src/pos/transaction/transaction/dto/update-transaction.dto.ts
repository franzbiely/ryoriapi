import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsString()
  table: string;

  @IsInt()
  branch_Id?: number;

  @IsOptional()
  paymongo_pi_id: string;

  @IsArray()
  @IsString({ each: true })
  item: string[];

  @IsDate()
  createdAt: Date;
}
