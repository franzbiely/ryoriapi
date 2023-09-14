import { Module } from '@nestjs/common';
import { InventoryLogsSchema } from './inventoryLogs.model';
import { InvLogsController } from './inventoryLogs.controller';
import { InventoryLogsService } from './inventoryLogs.service';
import { UsersSchema } from 'src/general/user/user.model';
import { BranchSchema } from 'src/general/branch/branch.model';
import { RawGrocerySchema } from '../rawGrocery/rawGrocery.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'InventoryLogs', schema: InventoryLogsSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'RawGrocery', schema: RawGrocerySchema },
      { name: 'Branch', schema: BranchSchema },
      ]),
  ],
  controllers: [InvLogsController],
  providers: [InventoryLogsService, Utils],
})
export class InventoryLogsModule {}
