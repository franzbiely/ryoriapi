/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsTypeDto } from './create-logType.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateLogsTypeDto extends PartialType(CreateLogsTypeDto) {
  @IsInt()
  id: number;

  @IsString()
  add: string;

  @IsString()
  thaw: string;

  @IsString()
  throw: string;

  @IsDate()
  createdAt: Date;
}
