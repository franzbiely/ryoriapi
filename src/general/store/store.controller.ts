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

  @Get(':sid/:bid')
  async findStoreAndBranch(@Param('sid') sid: ObjectId, @Param('bid') bid: ObjectId) {
    const response = await this.storeService.findStoreAndBranch(sid, bid);

    console.log({response})
    return {
      _id: response['_id'],
      branchName: response.branchName,
      email: response.email,
      contactNumber: response.contactNumber,
      address: response.address,
      store: {
        storeName: response.store['storeName'],
        photo: response.store['photo'],
        user: response.store['user'].map(user => ({
          id: user['_id'],
          role: user.role,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          password: user.password,
          userPhoto: user.userPhoto,
          createdAt: user.createdAt,
        })),
      },      
      transaction: response.transaction,
      rawGrocery: response.rawGrocery,
      branchItem: response.branchItem,
      rawCategory: response.rawCategory,
      transactionItem: response.transactionItem,
      inventoryLogs: response.inventoryLogs,
      createdAt: response.createdAt,
      // photo: await this.s3Service.getFile(response.store.photo) || '',
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    const response = await this.storeService.findOneId(id);
    const {
      storeName,
      branch,
      user,
      menuItem,
      menuCategory,
      createdAt,
    } = response
    return {
      _id: response['_id'],
      storeName,
      branch,
      user,
      menuItem,
      menuCategory,
      createdAt,
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
