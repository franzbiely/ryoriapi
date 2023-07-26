import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray, IsNumber, IsOptional } from '@nestjs/class-validator';

export class PayTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: number;

  @IsOptional()
  phone: number;

  @IsOptional()
  email: number;

  @IsOptional()
  name: number;
}
