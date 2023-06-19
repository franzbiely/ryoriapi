/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsType } from './logType.entity';
import { LogsTypeController } from './logType.controller';
import { LogsTypeService } from './logType.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogsType])],
  controllers: [LogsTypeController],
  providers: [LogsTypeService],
})
export class LogsTypeModule {}
