import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsInt()
  branch_Id?: number;

  @IsArray()
  @IsString({ each: true })
  item: string[];

  @IsDate()
  createdAt: Date;
}
