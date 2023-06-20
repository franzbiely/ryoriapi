/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Branch } from '../branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Branch])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
