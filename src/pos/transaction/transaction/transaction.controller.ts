import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

@Controller('pos/transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll() {
    return this.transactionService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.transactionService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    // console.log({ createTransactionDto });
    return this.transactionService.create(createTransactionDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    // this.transactionService.update(+id, updateTransactionDto);
    // return 'Updated';
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.transactionService.remove(+id);
    return 'Deleted!';
  }
}
