/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customers.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsDate()
    createdAt: Date;
}