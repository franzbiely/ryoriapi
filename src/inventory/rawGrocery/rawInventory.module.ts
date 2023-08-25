import { Module } from '@nestjs/common';
import { RawGroceryController } from './rawInventory.controller';
import { RawGroceryService } from './rawInventory.service';
import { RawCategorySchema } from '../rawCategory/rawCategory.model';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RawGrocerySchema } from './rawInventory.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'RawGrocery', schema: RawGrocerySchema },
    { name: 'RawCategory', schema: RawCategorySchema },
    { name: 'Branch', schema: BranchSchema }
  ])],
  controllers: [RawGroceryController],
  providers: [RawGroceryService],
})
export class RawGroceryModule {}
