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
import { InvLogsService } from './logs.service';
import { CreateInvLogsDto } from './dto/create-logs.dto';
import { UpdateInvLogsDto } from './dto/update-logs.dto';

@Controller('inventory/logs')
export class InvLogsController {
  constructor(private invLogsService: InvLogsService) {}

  @Get()
  async fillAll() {
    return this.invLogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.invLogsService.findOne(+id);
  }

  @Post()
  create(@Body() createInvLogsDto: CreateInvLogsDto) {
    return this.invLogsService.create(createInvLogsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvLogsDto: UpdateInvLogsDto) {
    this.invLogsService.update(+id, updateInvLogsDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.invLogsService.remove(+id);
    return 'Deleted!';
  }
}
