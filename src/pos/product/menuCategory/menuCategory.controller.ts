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
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { MenuCategoryService } from './menuCategory.service';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/utils/S3Service';
import { exit } from 'process';

@Controller('menuCategory')
export class MenuCategoryController {
  constructor(
    private menuCategoryService: MenuCategoryService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  async fillAll(@Query('store_Id') store_Id: number) {
    console.log("HERE I AM")
    const response = await this.menuCategoryService.findAll(store_Id);
    return await Promise.all(
      response.map(async (item) => {
        return {
          ...item,
          photo: await this.s3Service.getFile(item.photo) || ''
        }
      })
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.menuCategoryService.findOneId(+id);
    return {
      ...response,
      photo: await this.s3Service.getFile(response.photo) || '',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
    @Request() req,
    @UploadedFile() photo,
  ) {
    console.log('In menuCategory controller');

    if(photo) {
      const response = await this.s3Service.uploadFile(photo)
      if(response) {
        createMenuCategoryDto.photo = response.Key;
      }
    }
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
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
