/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateOutletDto } from './create-outlet.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateOutletDto extends PartialType(CreateOutletDto) {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsDate()
    createdAt: Date;
}