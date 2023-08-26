import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchItemDto } from './create-branchItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateBranchItemDto extends PartialType(CreateBranchItemDto) {
  @IsInt()
  id: ObjectId;

  @IsInt()
  quantity: number;

  @IsInt()
  branch_Id: any //ObjectId;

  @IsInt()
  menuItem_Id: any;

  @IsDate()
  createdAt: Date;
}
