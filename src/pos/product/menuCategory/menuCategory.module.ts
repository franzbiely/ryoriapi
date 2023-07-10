import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryService } from './menuCategory.service';
import { MenuCategory } from './menuCategory.entity';
import { MenuCategoryController } from './menuCategory.controller';
import { Store } from 'src/general/store/store.entity';
import { S3Service } from 'src/utils/S3Service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory, Store])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, S3Service],
})
export class MenuCategoryModule {}
