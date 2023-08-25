import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateStoreDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  storeName: string;

  @IsString()
  appId: string;

  @IsString()
  appSecret: string;

  @IsInt()
  branchId: number;

  @IsString()
  photo: string;

  @IsInt()
  menuItem_Id: number;

  @IsInt()
  user_Id: number;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  branchName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  contactNumber: string;

  @IsOptional()
  address: string;
}
