import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersSchema } from './user.model';
import { UserController } from './user.controller';
import { StoreSchema } from '../store/store.model';
import { BranchSchema } from '../branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';
import { RawGrocerySchema } from 'src/inventory/rawGrocery/rawGrocery.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Users', schema: UsersSchema },
    { name: 'Store', schema: StoreSchema },
    { name: 'Branch', schema: BranchSchema },
    { name: 'RawGrocery', schema: RawGrocerySchema },
  ])],
  controllers: [UserController],
  providers: [UserService, Utils],
})
export class UserModule {}
