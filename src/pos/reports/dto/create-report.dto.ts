import { IsString ,IsInt, IsDate } from '@nestjs/class-validator';

export class CreateReportDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    photo: string;

    @IsDate()
    createdAt: Date;
    
    @IsInt()
    parent_report_id: number;
}