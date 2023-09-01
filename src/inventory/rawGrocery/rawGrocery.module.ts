import { Module } from '@nestjs/common';
import { RawGroceryController } from './rawGrocery.controller';
import { RawGroceryService } from './rawGrocery.service';
import { RawCategorySchema } from '../rawCategory/rawCategory.model';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RawGrocerySchema } from './rawGrocery.model';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'RawGrocery', schema: RawGrocerySchema },
    { name: 'RawCategory', schema: RawCategorySchema },
    { name: 'Branch', schema: BranchSchema }
  ])],
  controllers: [RawGroceryController],
  providers: [RawGroceryService, Utils],
})
export class RawGroceryModule {}
