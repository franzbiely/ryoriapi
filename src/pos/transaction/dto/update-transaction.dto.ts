/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;

    @IsInt()
    parent_transaction_id: number;
}