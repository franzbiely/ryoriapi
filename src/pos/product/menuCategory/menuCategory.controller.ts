import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MenuCategoryService } from './menuCategory.service';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto, @Request() req) {
    console.log("In menuCategory controller")
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );

    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    this.menuCategoryService.update(+id, updateMenuCategoryDto);
    return 'Updated';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.menuCategoryService.remove(+id);
    return 'Deleted!';
  }
}
