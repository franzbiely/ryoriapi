import { IsString, IsInt, IsDate, IsArray } from '@nestjs/class-validator';

export class CreateTransactionDto {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsString()
  notes: string;

  @IsString()
  table: string;

  @IsInt()
  branch_Id: number;

  @IsArray()
  @IsString({ each: true })
  item: string[];

  @IsDate()
  createdAt: Date;
}
