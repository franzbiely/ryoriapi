import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionItemDto } from './create-transactionItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTransactionItemDto extends PartialType(
  CreateTransactionItemDto,
) {
  @IsOptional()
  status: string;

  @IsOptional()
  quantity: number;

  @IsString()
  customer_name: string;

  @IsOptional()
  menuItem_Id: string;

  @IsDate()
  createdAt: Date;
}
