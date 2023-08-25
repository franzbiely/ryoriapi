import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsInt()
  id: number;

  @IsInt()
  user_Id: number;

  @IsString()
  storeName: string;

  @IsString()
  appId: string;

  @IsString()
  appSecret: string;

  @IsString()
  photo: string;

  @IsOptional()
  branchName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  contactNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  branch_Id: number;
}
