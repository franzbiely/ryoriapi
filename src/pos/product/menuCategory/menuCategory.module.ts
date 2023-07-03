import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryService } from './menuCategory.service';
import { MenuCategory } from './menuCategory.entity';
import { MenuCategoryController } from './menuCategory.controller';
import { Store } from 'src/general/store/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory, Store])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
