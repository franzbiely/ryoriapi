import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersSchema } from './user.model';
import { UserController } from './user.controller';
import { StoreSchema } from '../store/store.model';
import { BranchSchema } from '../branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Users', schema: UsersSchema },
    { name: 'Store', schema: StoreSchema },
    { name: 'Branch', schema: BranchSchema }
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
