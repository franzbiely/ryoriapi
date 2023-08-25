import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { S3Service } from 'src/utils/S3Service';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { BranchSchema } from '../branch/branch.model';
import { UsersSchema } from '../user/user.model';
import { StoreSchema } from './store.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Store', schema: StoreSchema},
    {name: 'Users', schema: UsersSchema},
    {name: 'MenuItem', schema: MenuItemSchema},
    {name: 'Branch', schema: BranchSchema},
    ])],
  controllers: [StoreController],
  providers: [StoreService, S3Service],
})
export class StoreModule {}
