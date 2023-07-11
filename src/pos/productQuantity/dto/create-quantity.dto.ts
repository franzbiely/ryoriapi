import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateQuantityDto {
  @IsInt()
  id: number;

  @IsInt()
  qty: number;

  @IsInt()
  branch_Id: number;

  @IsDate()
  createdAt: Date;
}
