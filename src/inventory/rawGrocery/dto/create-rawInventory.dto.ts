import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateRawInvGrocDto {
  @IsInt()
  id: number;

  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsString()
  quantity: string;

  @IsDate()
  createdAt: Date;
}
