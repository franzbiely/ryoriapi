/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawCategory } from './rawCategory.entity';
import { RawCategoryController } from './rawCategory.controller';
import { RawCategoryService } from './rawCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([RawCategory])],
  controllers: [RawCategoryController],
  providers: [RawCategoryService],
})
export class RawCategoryModule {}
