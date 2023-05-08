/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUsersDto) {
    @IsInt()
    id: number;

    
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsInt()
    email: string;

    @IsString()
    password: string;

    @IsDate()
    createdAt: Date;
}