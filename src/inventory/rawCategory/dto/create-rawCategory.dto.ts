import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateRawCategoryDto {
  @IsInt()
  id: ObjectId;

  @IsString()
  title: string;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
