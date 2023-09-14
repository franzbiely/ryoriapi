import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menuCategory.service';
import { MenuCategorySchema } from './menuCategory.model';
import { MenuCategoryController } from './menuCategory.controller';
import { StoreSchema } from 'src/general/store/store.model';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemSchema } from '../menuItem/menuItem.model';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'MenuCategory', schema: MenuCategorySchema },
    { name: 'Store', schema: StoreSchema },
    { name: 'MenuItem', schema: MenuItemSchema }
    ])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, S3Service, Utils],
})
export class MenuCategoryModule {}
