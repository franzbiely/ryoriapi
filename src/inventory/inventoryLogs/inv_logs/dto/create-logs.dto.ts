import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateInvLogsDto {
  @IsInt()
  id: number;

  @IsString()
  type: string;

  @IsInt()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
