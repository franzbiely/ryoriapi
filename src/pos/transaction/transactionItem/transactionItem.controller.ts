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

@Controller('pos/transactionItem')
export class TransactionItemController {
  constructor(private transactionItemService: TransactionItemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    return this.transactionItemService.findAll(branch_Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.transactionItemService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionItemDto: CreateTransactionItemDto) {
    return this.transactionItemService.create(createTransactionItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionItemDto: UpdateTransactionItemDto,
  ) {
    this.transactionItemService.update(+id, updateTransactionItemDto);
    return 'Updated';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.transactionItemService.remove(+id);
    return 'Deleted!';
  }
}
