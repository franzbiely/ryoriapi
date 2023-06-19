import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { RawGroceryService } from './rawInventory.service';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';
import { UpdateRawGroceryDto } from './dto/update-rawInventory.dto';

@Controller('inventory/rawgrocery')
export class RawGroceryController {
  constructor(private rawGroceryService: RawGroceryService) {}

  @Get()
  async fillAll() {
    return this.rawGroceryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rawGroceryService.findOne(+id);
  }

  @Post()
  create(@Body() createRawGroceyDto: CreateRawGroceryDto) {
    return this.rawGroceryService.create(createRawGroceyDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawGroceryDto: UpdateRawGroceryDto,
  ) {
    this.rawGroceryService.update(+id, updateRawGroceryDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.rawGroceryService.remove(+id);
    return 'Deleted!';
  }
}
