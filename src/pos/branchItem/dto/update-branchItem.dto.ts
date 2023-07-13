import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchItemDto } from './create-branchItem.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';

export class UpdateBranchItemDto extends PartialType(CreateBranchItemDto) {
  @IsInt()
  id: number;

  @IsInt()
  quantity: number;

  @IsInt()
  branch_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsDate()
  createdAt: Date;
}
