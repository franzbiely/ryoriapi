import { Module } from '@nestjs/common';
import { BranchItemSchema } from './branchItem.model';
import { QuantityController } from './branchItem.controller';
import { BranchItemService } from './branchItem.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MenuItemSchema } from '../product/menuItem/menuItem.model';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'BranchItem', schema: BranchItemSchema },
    { name: 'Branch', schema: BranchSchema },
    { name: 'MenuItem', schema: MenuItemSchema }
    ])],
  controllers: [QuantityController],
  providers: [BranchItemService, S3Service],
})
export class BranchItemModule {}
