import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Branch } from '../branch/branch.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { S3Service } from 'src/utils/S3Service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Users, MenuItem])],
  controllers: [StoreController],
  providers: [StoreService, S3Service],
})
export class StoreModule {}
