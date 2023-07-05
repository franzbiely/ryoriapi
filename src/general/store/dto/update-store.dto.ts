import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsString, IsInt, IsDate } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { Branch } from 'src/general/branch/branch.entity';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsInt()
  id: number;

  @IsString()
  storeName: string;

  @IsInt()
  storeId: number;

  @IsOptional()
  branch: Branch[];

  @IsInt()
  menuItem_Id: number;

  @IsInt()
  user_Id: number;

  @IsDate()
  createdAt: Date;
}
