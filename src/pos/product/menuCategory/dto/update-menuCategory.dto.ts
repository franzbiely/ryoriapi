import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuCategoryDto } from './create-menuCategory.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsString()
  createdAt: Date;
}
