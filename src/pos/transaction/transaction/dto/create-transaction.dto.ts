import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateTransactionDto {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;
}
