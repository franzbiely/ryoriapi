/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateBranchDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  contactNumber: string;

  @IsString()
  address: string;

  @IsDate()
  createdAt: Date;
}
