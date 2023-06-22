/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInvLogsDto } from './create-logs.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateInvLogsDto extends PartialType(CreateInvLogsDto) {
  @IsInt()
  id: number;

  @IsString()
  type: string;

  @IsInt()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
