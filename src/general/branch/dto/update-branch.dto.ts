import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  branchName: string;

  @IsString()
  email: string;

  @IsString()
  contactNumber: string;

  @IsString()
  address: string;

  @IsInt()
  store_Id: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsDate()
  createdAt: Date;
}
