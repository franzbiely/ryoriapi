import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { Store } from 'src/general/store/store.entity';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  contactNumber: string;

  @IsString()
  address: string;

  @IsInt()
  storeId: number;

  @IsDate()
  createdAt: Date;
}
