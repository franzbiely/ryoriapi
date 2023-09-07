import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateUsersDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  role?: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  userPhoto: string;

  @IsString()
  address?: string;

  @IsDate()
  createdAt: Date;

  // Not in DB

  @IsString()
  store_Id?: string;
  @IsString()
  branch_Id: string;
}
