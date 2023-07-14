import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemService } from './menuItem.service';
import { MenuItem } from './menuItem.entity';
import { MenuItemController } from './menuItem.controller';
import { Branch } from 'src/general/branch/branch.entity';
import { MenuCategory } from '../menuCategory/menuCategory.entity';
import { Store } from 'src/general/store/store.entity';
import { S3Service } from 'src/utils/S3Service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, MenuCategory, Branch, Store])],
  controllers: [MenuItemController],
  providers: [MenuItemService, S3Service],
})
export class MenuItemModule {}
