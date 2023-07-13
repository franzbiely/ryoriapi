import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';

@Controller('menuItem')
export class MenuItemController {
  constructor(private menuItemService: MenuItemService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async fillAll(@Query('store_Id') store_Id: number) {
  //   return this.menuItemService.findAll(store_Id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllWithBranchQty(
    @Query('store_Id') store_Id: number,
    @Query('branch_Id') branch_Id: number,
  ) {
    return this.menuItemService.findAllWithBranchQty(store_Id, branch_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuItemService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    return this.menuItemService.create(createMenuItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}
