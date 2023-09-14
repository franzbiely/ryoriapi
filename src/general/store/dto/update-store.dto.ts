import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsOptional()
  storeName: string;

  @IsOptional()
  appId: string;

  @IsOptional()
  appSecret: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  user_Id: string;

  @IsOptional()
  branch_Id: string;

  @IsOptional()
  menuItem_Id: string;

  @IsOptional()
  menuCategory_Id: string;
}
