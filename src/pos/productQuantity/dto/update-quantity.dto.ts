import { PartialType } from '@nestjs/mapped-types';
import { CreateQuantityDto } from './create-quantity.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';

export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {
  @IsInt()
  id: number;

  @IsInt()
  quantity: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
