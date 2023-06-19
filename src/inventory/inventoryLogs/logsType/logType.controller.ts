/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { LogsTypeService } from './logType.service';
import { CreateLogsTypeDto } from './dto/create-logType.dto';
import { UpdateLogsTypeDto } from './dto/update-logType.dto';

@Controller('inventory/logsType')
export class LogsTypeController {
  constructor(private logsTypeService: LogsTypeService) {}

  @Get()
  async fillAll() {
    return this.logsTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.logsTypeService.findOne(+id);
  }

  @Post()
  create(@Body() createLogsTypeDto: CreateLogsTypeDto) {
    return this.logsTypeService.create(createLogsTypeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogTypeDto: UpdateLogsTypeDto) {
    this.logsTypeService.update(+id, updateLogTypeDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logsTypeService.remove(+id);
    return 'Deleted!';
  }
}
