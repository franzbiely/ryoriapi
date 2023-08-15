import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateInventoryLogsDto {
  @IsInt()
  id: number;

  @IsString()
  type: string;

  @IsInt()
  quantityLogs: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  rawGrocery_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
