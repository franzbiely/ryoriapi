import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateCategoryDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;
    
    @IsInt()
    parent_category_id: number;
}