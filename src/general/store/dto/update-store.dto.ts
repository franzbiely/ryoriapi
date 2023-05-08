/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
    @IsInt()
    id: number;

    @IsString()
    address:string;

    @IsString()
    storeName:string;

    @IsDate()
    createdAt: Date;

}