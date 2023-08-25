import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateConsumptionDto {
    @IsInt()
    id: ObjectId;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;
    
    @IsInt()
    parent_consumption_id: ObjectId;
}