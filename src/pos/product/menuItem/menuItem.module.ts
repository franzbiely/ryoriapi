import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemService } from './menuItem.service';
import { MenuItem } from './menuItem.entity';
import { MenuItemController } from './menuItem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
