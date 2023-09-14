import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateStoreDto {
  @IsString()
  storeName: string;

  @IsString()
  appId: string;

  @IsString()
  appSecret: string;

  @IsString()
  photo: string;

  @IsString()
  user_Id: string;

  @IsString()
  branch_Id: string;

  @IsString()
  menuItem_Id: string;

  @IsString()
  menuCategory_Id: string;

  // Not in Modal but can be requested from HTTP
  @IsString()
  branchName: string;
  @IsString()
  email: string;
  @IsString()
  contactNumber: string;
  @IsString()
  address: string;
}
