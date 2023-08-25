import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchSchema } from './branch.model';
import { BranchController } from './branch.controller';
import { StoreSchema } from '../store/store.model';
import { UsersSchema } from '../user/user.model';
import { MenuItemSchema } from 'src/pos/product/menuItem/menuItem.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'Branch', schema: BranchSchema},
      {name: 'Store', schema: StoreSchema},
      {name: 'Users', schema: UsersSchema},
      {name: 'MenuItem', schema: MenuItemSchema},
    ]
  )],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
