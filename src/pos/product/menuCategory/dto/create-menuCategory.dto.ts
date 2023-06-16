import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateMenuCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsString()
  createdAt: Date;
}
