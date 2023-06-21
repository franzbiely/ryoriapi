import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchService } from './branch.service';
import { Branch } from './branch.entity';
import { BranchController } from './branch.controller';
import { Store } from '../store/store.entity';
import { Users } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Store, Users])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
