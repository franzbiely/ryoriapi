import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { RawInvGrocService } from './rawInventory.service';
import { CreateRawInvGrocDto } from './dto/create-rawInventory.dto';
import { UpdateRawInvGrocDto } from './dto/update-rawInventory.dto';

@Controller('inventory/rawgrocery')
export class RawInvGrocController {
  constructor(private rawInvGrocService: RawInvGrocService) {}

  @Get()
  async fillAll() {
    return this.rawInvGrocService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rawInvGrocService.findOne(+id);
  }

  @Post()
  create(@Body() createRawInvGrocDto: CreateRawInvGrocDto) {
    return this.rawInvGrocService.create(createRawInvGrocDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawInvGrocDto: UpdateRawInvGrocDto,
  ) {
    this.rawInvGrocService.update(+id, updateRawInvGrocDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.rawInvGrocService.remove(+id);
    return 'Deleted!';
  }
}
