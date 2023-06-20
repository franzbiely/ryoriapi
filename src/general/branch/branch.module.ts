import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchService } from './branch.service';
import { Branch } from './branch.entity';
import { BranchController } from './branch.controller';
import { Store } from '../store/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Store])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
