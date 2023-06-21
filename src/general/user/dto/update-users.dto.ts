import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUsersDto) {
  @IsInt()
  id: number;

  @IsString()
  role: string;

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
  address: string;

  @IsInt()
  store_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
