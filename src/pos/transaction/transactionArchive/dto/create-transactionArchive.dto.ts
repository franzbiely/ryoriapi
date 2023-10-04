import {
  IsString,
  IsInt,
  IsDate,
  IsArray,
  IsObject,
} from '@nestjs/class-validator';
export class CreateTransactionArchiveDto {
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

  @IsString()
  item: string | string[];

  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
}
