import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUsersDto) {
  @IsInt()
  id: ObjectId;

  @IsOptional()
  role: string;

  @IsOptional()
  username: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  userPhoto: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  store_Id?: string;

  @IsOptional()
  branch_Id: string;

  @IsDate()
  createdAt: Date;
}
