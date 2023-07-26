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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/authentication/guard/jwt-auth.guard';
import { PayTransactionDto } from './dto/pay-transaction.dto';

@Controller('pos/transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    return this.transactionService.findAll(branch_Id);
  }

  // @TODO: Add security instead of guards..
  // @Note: No Guard because used in FE to get the transaction details...
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.transactionService.findOne(+id);
  }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('/create-payment/:id')
  create_payment(@Param('id') id: string, @Body() payTransactionDto: PayTransactionDto) {
    return this.transactionService.create_payment(+id, payTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    this.transactionService.update(+id, updateTransactionDto);
    return 'Updated';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.transactionService.remove(+id);
    return 'Deleted!';
  }
}
