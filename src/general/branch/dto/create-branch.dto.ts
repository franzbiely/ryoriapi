import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateBranchDto {
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
  transactionArchive_Id: string;

  @IsOptional()
  user_Id: string;

  @IsOptional()
  used: number;

  @IsOptional()
  limit: number;
  // Not in model

  @IsOptional()
  store_Id: string;
}
