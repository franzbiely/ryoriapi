import { PartialType } from '@nestjs/mapped-types';
import { CreateRawInvGrocDto } from './create-rawInventory.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class UpdateRawInvGrocDto extends PartialType(CreateRawInvGrocDto) {
  @IsInt()
  id: number;

  @IsString()
  item: string;

  @IsString()
  weight: string;

  @IsString()
  quantity: string;

  @IsDate()
  createdAt: Date;
}
