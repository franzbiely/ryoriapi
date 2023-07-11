import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './quantity.entity';
import { QuantityController } from './quantity.controller';
import { QuantityService } from './quantity.service';
import { Branch } from 'src/general/branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity, Branch])],
  controllers: [QuantityController],
  providers: [QuantityService],
})
export class QuantityModule {}
