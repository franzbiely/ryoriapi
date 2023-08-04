import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateInventoryLogsDto {
  @IsInt()
  id: number;

  @IsString()
  type: string;

  @IsInt()
  qtyReady: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
