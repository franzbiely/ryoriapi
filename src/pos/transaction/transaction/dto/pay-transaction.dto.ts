import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray, IsNumber } from '@nestjs/class-validator';

export class PayTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  discounts: number;

  @IsString()
  type: string;
  
  @IsString()
  redirect_success: string;

  @IsString()
  redirect_failed: string;

}
