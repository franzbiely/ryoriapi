import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateTransactionItemDto {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;
}
