import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchItemDto } from './create-branchItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateBranchItemDto extends PartialType(CreateBranchItemDto) {
  @IsOptional()
  quantity: number;

  @IsOptional()
  menuItem_Id: string;

  @IsOptional()
  user_Id: string;

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsOptional()
  branch_Id: string;
}
