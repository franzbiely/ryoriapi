import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawInvGroc } from './rawInventory.entity';
import { RawInvGrocController } from './rawInventory.controller';
import { RawInvGrocService } from './rawInventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([RawInvGroc])],
  controllers: [RawInvGrocController],
  providers: [RawInvGrocService],
})
export class RawInvGrocModule {}
