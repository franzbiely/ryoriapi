/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RawCategorySchema } from './rawCategory.model';
import { RawCategoryController } from './rawCategory.controller';
import { RawCategoryService } from './rawCategory.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RawGrocerySchema } from '../rawGrocery/rawGrocery.model';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'RawCategory', schema: RawCategorySchema },
    { name: 'RawGrocery', schema: RawGrocerySchema },
    { name: 'Branch', schema: BranchSchema },
  ])],
  controllers: [RawCategoryController],
  providers: [RawCategoryService, Utils],
})
export class RawCategoryModule {}
