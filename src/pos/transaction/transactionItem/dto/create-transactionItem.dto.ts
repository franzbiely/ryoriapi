import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateTransactionItemDto {
  @IsInt()
  id: number;

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
