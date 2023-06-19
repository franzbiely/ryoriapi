import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateRawCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @IsInt()
  parent_category_id: number;
}
