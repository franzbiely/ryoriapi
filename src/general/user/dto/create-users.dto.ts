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

  @IsInt()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  userPhoto: string;

  @IsString()
  address?: string;

  @IsInt()
  store_Id?: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
