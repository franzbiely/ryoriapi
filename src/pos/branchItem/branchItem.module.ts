import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchItem } from './branchItem.entity';
import { QuantityController } from './branchItem.controller';
import { BranchItemService } from './branchItem.service';
import { Branch } from 'src/general/branch/branch.entity';
import { MenuItem } from '../product/menuItem/menuItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchItem, Branch, MenuItem])],
  controllers: [QuantityController],
  providers: [BranchItemService],
})
export class BranchItemModule {}
