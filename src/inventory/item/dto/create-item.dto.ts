import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateItemDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;
    
    @IsInt()
    parent_item_id: number;
}