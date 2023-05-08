/* eslint-disable prettier/prettier */
import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateOutletDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsDate()
    createdAt: Date;
}
