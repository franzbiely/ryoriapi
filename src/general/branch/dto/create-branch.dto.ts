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
  user_Id: string;
}
