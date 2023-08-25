/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class CreateCustomerDto {
    @IsInt()
    id: ObjectId;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsDate()
    createdAt: Date;

}
