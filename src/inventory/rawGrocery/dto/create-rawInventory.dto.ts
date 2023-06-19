import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateRawGroceryDto {
  @IsInt()
  id: number;

  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsInt()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
