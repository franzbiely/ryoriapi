/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRawCategoryDto } from './create-rawCategory.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UpdateRawCategoryDto extends PartialType(CreateRawCategoryDto) {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

}
