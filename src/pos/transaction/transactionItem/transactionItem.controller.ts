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
import { TransactionItemService } from './transactionItem.service';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';
import { UpdateTransactionItemDto } from './dto/update-transactionItem.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@Controller('pos/transactionItem')
export class TransactionItemController {
  constructor(private transactionItemService: TransactionItemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: ObjectId) {
    return this.transactionItemService.findAll(branch_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return this.transactionItemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionItemDto: CreateTransactionItemDto) {
    return this.transactionItemService.create(createTransactionItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateTransactionItemDto: UpdateTransactionItemDto,
  ) {
    return this.transactionItemService.update(id, updateTransactionItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.transactionItemService.remove(id);
  }
}
