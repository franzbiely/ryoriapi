import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLogs } from './inventoryLogs.entity';
import { InvLogsController } from './inventoryLogs.controller';
import { InventoryLogsService } from './inventoryLogs.service';
import { Users } from 'src/general/user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLogs, Users, MenuItem, Branch])],
  controllers: [InvLogsController],
  providers: [InventoryLogsService],
})
export class InventoryLogsModule {}
