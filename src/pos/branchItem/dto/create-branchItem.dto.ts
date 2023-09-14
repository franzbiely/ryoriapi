import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateBranchItemDto {
  @IsInt()
  quantity: number;

  @IsString()
  menuItem_Id: string;

  @IsString()
  user_Id: string;

  @IsDate()
  createdAt: Date;

  // Not in Model but necessary in HTTP
  @IsString()
  branch_Id: string;
}
