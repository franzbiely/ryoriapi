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
import { RawCategoryService } from './rawCategory.service';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';

@Controller('inventrory/rawcategory')
export class RawCategoryController {
  constructor(private rawCategoryService: RawCategoryService) {}

  @Get()
  async fillAll() {
    return this.rawCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rawCategoryService.findOne(+id);
  }

  @Post()
  create(@Body() createRawCategoryDto: CreateRawCategoryDto) {
    return this.rawCategoryService.create(createRawCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawCategoryDto: UpdateRawCategoryDto,
  ) {
    return this.rawCategoryService.update(+id, updateRawCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawCategoryService.remove(+id);
  }
}
