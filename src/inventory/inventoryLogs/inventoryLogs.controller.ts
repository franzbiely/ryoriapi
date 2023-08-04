import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryLogsService } from './inventoryLogs.service';
import { CreateInventoryLogsDto } from './dto/create-inventoryLogs.dto';
import { UpdateInventoryLogsDto } from './dto/update-inventoryLogs.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('inventory/logs')
export class InvLogsController {
  constructor(private invLogsService: InventoryLogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    return this.invLogsService.findAll(branch_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.invLogsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInvLogsDto: CreateInventoryLogsDto) {
    return this.invLogsService.create(createInvLogsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvLogsDto: UpdateInventoryLogsDto,
  ) {
    this.invLogsService.update(+id, updateInvLogsDto);
    return 'Updated';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.invLogsService.remove(+id);
    return 'Deleted!';
  }
}
