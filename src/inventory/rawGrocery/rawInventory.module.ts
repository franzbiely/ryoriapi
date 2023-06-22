import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawGrocery } from './rawInventory.entity';
import { RawGroceryController } from './rawInventory.controller';
import { RawGroceryService } from './rawInventory.service';
import { RawCategory } from '../rawCategory/rawCategory.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawGrocery, RawCategory, Branch])],
  controllers: [RawGroceryController],
  providers: [RawGroceryService],
})
export class RawGroceryModule {}
