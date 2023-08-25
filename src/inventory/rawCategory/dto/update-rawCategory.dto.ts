/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRawCategoryDto } from './create-rawCategory.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateRawCategoryDto extends PartialType(CreateRawCategoryDto) {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

}
