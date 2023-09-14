import { Module } from '@nestjs/common';
import { BranchItemSchema } from './branchItem.model';
import { QuantityController } from './branchItem.controller';
import { BranchItemService } from './branchItem.service';
import { BranchSchema } from 'src/general/branch/branch.model';
import { MenuItemSchema } from '../product/menuItem/menuItem.model';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuCategorySchema } from '../product/menuCategory/menuCategory.model';
import { Utils } from 'src/utils/utils';
import { UsersSchema } from 'src/general/user/user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UsersSchema },
    { name: 'BranchItem', schema: BranchItemSchema },
    { name: 'Branch', schema: BranchSchema },
    { name: 'MenuItem', schema: MenuItemSchema },
    { name: 'MenuCategory', schema: MenuCategorySchema }
    ])],
  controllers: [QuantityController],
  providers: [BranchItemService, S3Service, Utils],
})
export class BranchItemModule {}
