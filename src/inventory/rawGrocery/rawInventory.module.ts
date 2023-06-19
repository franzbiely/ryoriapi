import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawGrocery } from './rawInventory.entity';
import { RawGroceryController } from './rawInventory.controller';
import { RawGroceryService } from './rawInventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([RawGrocery])],
  controllers: [RawGroceryController],
  providers: [RawGroceryService],
})
export class RawGroceryModule {}
