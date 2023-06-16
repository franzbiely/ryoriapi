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
import { MenuCategoryService } from './menuCategory.service';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';

@Controller('menuCategory')
export class MenuCategoryController {
  constructor(private menuCategoryService: MenuCategoryService) {}

  @Get()
  async fillAll() {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuCategoryService.findOne(+id);
  }

  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    this.menuCategoryService.update(+id, updateMenuCategoryDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.menuCategoryService.remove(+id);
    return 'Deleted!';
  }
}
