/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateStoreDto {
  @IsInt()
  id: number;

  @IsString()
  storeName: string;

  @IsDate()
  createdAt: Date;
}
