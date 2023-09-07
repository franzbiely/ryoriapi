import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateTransactionDto {
  @IsString()
  status: string;

  @IsString()
  table: string;

  @IsString()
  notes: string;

  @IsString()
  amount: number;

  @IsString()
  paymongo_pi_id: string;

  @IsArray()
  @IsString({ each: true })
  transactionItem_Id: string[];

  @IsDate()
  createdAt: Date;
  
  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
}
