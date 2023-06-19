import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateLogsTypeDto {
  @IsInt()
  id: number;

  @IsString()
  add: string;

  @IsString()
  thaw: string;

  @IsString()
  throw: string;

  @IsDate()
  createdAt: Date;
}
