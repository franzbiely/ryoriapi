/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateCustomerDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsDate()
    createdAt: Date;

}
