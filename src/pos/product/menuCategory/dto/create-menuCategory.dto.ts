import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateMenuCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsInt()
  store_Id: number;

  @IsString()
  createdAt: Date;
}
