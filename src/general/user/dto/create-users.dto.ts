import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateUsersDto {
  @IsInt()
  id: number;

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
  address?: string;

  @IsInt()
  store_Id: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
