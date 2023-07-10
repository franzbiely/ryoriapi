import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateRawCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
