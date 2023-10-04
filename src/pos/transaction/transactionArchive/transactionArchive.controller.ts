import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionArchiveService } from './transactionArchive.service';
import { CreateTransactionArchiveDto } from './dto/create-transactionArchive.dto';
import { UpdateTransactionArchiveDto } from './dto/update-transactionArchive.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { S3Service } from 'src/utils/S3Service';
import { AppGateway } from 'src/app.gateway';
import { ObjectId } from 'mongoose';

@Controller('pos/transactionarchive')
export class TransactionArchiveController {
  constructor(private transactionArchiveService: TransactionArchiveService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: ObjectId) {
    return this.transactionArchiveService.findAll(branch_Id);
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    const response = await this.transactionArchiveService.findOne(id);
    return response;
    //   const transactionItems = await Promise.all(
    //     response.transactionItems.map(async (item) => {
    //       return {
    //         ...item,
    //       };
    //     }),
    //   );
    //   return {
    //     ...response,
    //     transactionItems,
    //   };
  }

  // @Post()
  // async create(@Body() createTransactionDto: CreateTransactionArchiveDto) {
  //   const result = await this.transactionArchiveService.create(
  //     createTransactionDto,
  //   );
  //   return result;
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: ObjectId,
  //   @Body() updateTransactionDto: UpdateTransactionArchiveDto,
  // ) {
  //   return this.transactionArchiveService.update(id, updateTransactionDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.transactionArchiveService.remove(id);
  }
}
