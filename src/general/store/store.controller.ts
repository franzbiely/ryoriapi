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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/utils/S3Service';
import { ObjectId } from 'mongoose';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService, private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll() {
    return this.storeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sid/:bid')
  async findStoreAndBranch(@Param('sid') sid: ObjectId, @Param('bid') bid: ObjectId) {
    const response = await this.storeService.findStoreAndBranch(sid, bid);
    return {
      ...response,
      // photo: await this.s3Service.getFile(response.store.photo) || '',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    const response = await this.storeService.findOneId(id);
    return {
      ...response,
      photo: await this.s3Service.getFile(response.photo) || '',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() createStoreDto: CreateStoreDto, @Request() req, @UploadedFile() photo) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    const user_Id = decodedToken.userPayload.id;
    createStoreDto.user_Id = user_Id;
    if(photo) {
      const response = await this.s3Service.uploadFile(photo)
      if(response) {
        createStoreDto.photo = response.Key;
      }
    }
    console.log({createStoreDto})
    return this.storeService.create(createStoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: ObjectId, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.storeService.remove(id);
  }
}
