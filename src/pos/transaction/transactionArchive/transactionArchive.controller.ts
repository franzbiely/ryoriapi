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

@Controller('pos/transaction')
export class TransactionArchiveController {
  constructor(
    private transactionService: TransactionArchiveService,
    private readonly s3Service: S3Service,
    private readonly appGateway: AppGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: ObjectId) {
    return this.transactionService.findAll(branch_Id);
  }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionArchiveDto) {
    const result = await this.transactionService.create(createTransactionDto);
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateTransactionDto: UpdateTransactionArchiveDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.transactionService.remove(id);
  }
}
