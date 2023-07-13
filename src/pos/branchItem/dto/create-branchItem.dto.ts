import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateBranchItemDto {
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
