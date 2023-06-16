import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { TransactionItemService } from './transactionItem.service';
import { CreateTransactionItemDto } from './dto/create-transactionItem.dto';
import { UpdateTransactionItemDto } from './dto/update-transactionItem.dto';

@Controller('pos/transactionItem')
export class TransactionItemController {
  constructor(private transactionItemService: TransactionItemService) {}

  @Get()
  async fillAll() {
    return this.transactionItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.transactionItemService.findOne(+id);
  }

  @Post()
  create(@Body() createTransactionItemDto: CreateTransactionItemDto) {
    return this.transactionItemService.create(createTransactionItemDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionItemDto: UpdateTransactionItemDto,
  ) {
    this.transactionItemService.update(+id, updateTransactionItemDto);
    return 'Updated';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.transactionItemService.remove(+id);
    return 'Deleted!';
  }
}
