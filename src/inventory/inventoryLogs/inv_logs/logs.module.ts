/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvLogs } from './logs.entity';
import { InvLogsController } from './logs.controller';
import { InvLogsService } from './logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvLogs])],
  controllers: [InvLogsController],
  providers: [InvLogsService],
})
export class InvLogsModule {}
