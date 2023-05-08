import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateTransactionDto {
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