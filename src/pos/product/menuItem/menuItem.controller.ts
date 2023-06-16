import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Res,
} from '@nestjs/common';
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';

@Controller('menuItem')
export class MenuItemController {
  constructor(private menuItemService: MenuItemService) {}

  @Get()
  async fillAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuItemService.findOne(+id);
  }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    this.menuItemService.update(+id, updateMenuItemDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.menuItemService.remove(+id);
    return 'Deleted!';
  }
}
