import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsOptional()
  branchName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  contactNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  branchItem_Id: string;

  @IsOptional()
  rawGrocery_Id: string;

  @IsOptional()
  rawCategory_Id: string;

  @IsOptional()
  transaction_Id: string;

  @IsOptional()
  user_Id: string;
}
