import { Module } from '@nestjs/common';
import { MenuItemService } from './menuItem.service';
import { MenuItemSchema } from './menuItem.model';
import { MenuItemController } from './menuItem.controller';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MenuCategorySchema } from '../menuCategory/menuCategory.model';
import { StoreSchema } from 'src/general/store/store.model';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'MenuItem', schema: MenuItemSchema },
    { name: 'MenuCategory', schema: MenuCategorySchema },
    { name: 'Branch', schema: BranchSchema },
    { name: 'Store', schema: StoreSchema }
  ])],
  controllers: [MenuItemController],
  providers: [MenuItemService, S3Service, Utils],
})
export class MenuItemModule {}
