/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RawCategoryService } from './rawCategory.service';
import { CreateRawCategoryDto } from './dto/create-rawCategory.dto';
import { UpdateRawCategoryDto } from './dto/update-rawCategory.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('inventrory/rawcategory')
export class RawCategoryController {
  constructor(private rawCategoryService: RawCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    return this.rawCategoryService.findAll(branch_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rawCategoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRawCategoryDto: CreateRawCategoryDto) {
    return this.rawCategoryService.create(createRawCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawCategoryDto: UpdateRawCategoryDto,
  ) {
    return this.rawCategoryService.update(+id, updateRawCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawCategoryService.remove(+id);
  }
}
