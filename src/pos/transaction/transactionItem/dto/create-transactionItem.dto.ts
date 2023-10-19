import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateTransactionItemDto {
  @IsString()
  status: string;

  @IsInt()
  quantity: number;

  @IsString()
  name: string;

  @IsString()
  menuItem_Id: string;

  @IsDate()
  createdAt: Date;

  // Not in Model
  @IsString()
  transaction_Id: string;
}
