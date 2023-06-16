import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionItemDto } from './create-transactionItem.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateTransactionItemDto extends PartialType(
  CreateTransactionItemDto,
) {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;
}
