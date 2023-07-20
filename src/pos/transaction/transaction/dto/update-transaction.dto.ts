import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsInt()
  branch_Id: number;

  @IsString()
  item: string[];

  @IsDate()
  createdAt: Date;
}
