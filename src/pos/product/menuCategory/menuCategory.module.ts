import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menuCategory.service';
import { MenuCategorySchema } from './menuCategory.model';
import { MenuCategoryController } from './menuCategory.controller';
import { StoreSchema } from 'src/general/store/store.model';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'MenuCategory', schema: MenuCategorySchema },
    { name: 'Store', schema: StoreSchema }
    ])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, S3Service],
})
export class MenuCategoryModule {}
