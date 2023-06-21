import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateBranchDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  contactNumber: string;

  @IsString()
  address: string;

  @IsInt()
  storeId: number;

  @IsInt()
  user_Id: number;

  @IsInt()
  menuItem_Id: number;

  @IsDate()
  createdAt: Date;
}
