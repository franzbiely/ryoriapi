import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemService } from './menuItem.service';
import { MenuItem } from './menuItem.entity';
import { MenuItemController } from './menuItem.controller';
import { Branch } from 'src/general/branch/branch.entity';
import { MenuCategory } from '../menuCategory/menuCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, MenuCategory, Branch])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
