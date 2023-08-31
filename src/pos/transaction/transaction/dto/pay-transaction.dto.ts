import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString, IsInt, IsDate, IsArray, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class PayTransactionDto extends PartialType(CreateTransactionDto) {
  @IsInt()
  id: ObjectId;

  @IsOptional()
  phone: number;

  @IsOptional()
  email: number;

  @IsOptional()
  name: number;

  @IsOptional()
  amount: number;
}
