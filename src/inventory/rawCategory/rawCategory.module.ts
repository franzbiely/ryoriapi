/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RawCategorySchema } from './rawCategory.model';
import { RawCategoryController } from './rawCategory.controller';
import { RawCategoryService } from './rawCategory.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'RawCategory', schema: RawCategorySchema },
    { name: 'Branch', schema: BranchSchema },
  ])],
  controllers: [RawCategoryController],
  providers: [RawCategoryService],
})
export class RawCategoryModule {}
