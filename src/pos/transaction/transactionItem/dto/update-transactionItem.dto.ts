import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionItemDto } from './create-transactionItem.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTransactionItemDto extends PartialType(
  CreateTransactionItemDto,
) {
  @IsInt()
  id: ObjectId;

  @IsString()
  status: string;

  @IsInt()
  quantity: number;

  @IsInt()
  transaction_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
