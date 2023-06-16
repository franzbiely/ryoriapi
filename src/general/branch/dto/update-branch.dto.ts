/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
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
