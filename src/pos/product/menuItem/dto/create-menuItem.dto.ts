import { IsString, IsInt, IsDate } from '@nestjs/class-validator';

export class CreateMenuItemDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  photo: string;

  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  @IsString()
  description: string;

  @IsString()
  cookingTime: string;

  @IsInt()
  store_Id: number;

  @IsInt()
  category_Id: number;

  @IsString()
  createdAt: Date;
}
