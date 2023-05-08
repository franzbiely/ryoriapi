/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateUsersDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    lastName: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsDate()
    createdAt: Date;
}
