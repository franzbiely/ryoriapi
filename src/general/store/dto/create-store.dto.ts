import { IsString, IsInt, IsDate, IsOptional } from '@nestjs/class-validator';
import { Branch } from 'src/general/branch/branch.entity';
import { Users } from 'src/general/user/user.entity';

export class CreateStoreDto {
  @IsInt()
  id: number;

  @IsString()
  storeName: string;

  @IsInt()
  branchId: number;

  @IsInt()
  user_Id: number;

  @IsDate()
  createdAt: Date;
}
