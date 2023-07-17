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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/utils/S3Service';
@Controller('menuItem')
export class MenuItemController {
  constructor(
    private menuItemService: MenuItemService,
    private readonly s3Service: S3Service,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async fillAll(@Query('store_Id') store_Id: number) {
  //   return this.menuItemService.findAll(store_Id);
  // }

  @Get()
  async findAllWithBranchQty(
    @Query('store_Id') store_Id: number,
    @Query('branch_Id') branch_Id: number,
  ) {
    const response = await this.menuItemService.findAllWithBranchQty(
      store_Id,
      branch_Id,
    );
    return await Promise.all(
      response.map(async (item) => {
        return {
          ...item,
          photo: await this.s3Service.getFile(item.photo),
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.menuItemService.findOne(+id);
    return {
      ...response,
      photo: await this.s3Service.getFile(response.photo),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Request() req,
    @UploadedFile() photo,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    if (photo) {
      const response = await this.s3Service.uploadFile(photo);
      createMenuItemDto.photo = response.Key;
    }
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
