import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateBranchItemDto {
  @IsInt()
  id: ObjectId;

  @IsInt()
  quantity: number;

  @IsInt()
  branch_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsDate()
  createdAt: Date;
}
