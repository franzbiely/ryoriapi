import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { UserController } from './user.controller';
import { Store } from '../store/store.entity';
import { Branch } from '../branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Store, Branch])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
