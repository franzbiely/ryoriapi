import { Module } from '@nestjs/common';
import { InventoryLogsSchema } from './inventoryLogs.model';
import { InvLogsController } from './inventoryLogs.controller';
import { InventoryLogsService } from './inventoryLogs.service';
import { UsersSchema } from 'src/general/user/user.model';
import { BranchSchema } from 'src/general/branch/branch.model';
import { RawGrocerySchema } from '../rawGrocery/rawInventory.model';
import { MongooseModule } from '@nestjs/mongoose';

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
  providers: [InventoryLogsService],
})
export class InventoryLogsModule {}
