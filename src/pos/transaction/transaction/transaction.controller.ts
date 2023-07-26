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
import { S3Service } from 'src/utils/S3Service';
@Controller('pos/transaction')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private readonly s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fillAll(@Query('branch_Id') branch_Id: number) {
    return this.transactionService.findAll(branch_Id);
  }

  @Get('/status/:id')
  async getStatus(@Param('id') id: number) {
    return this.transactionService.getStatus(+id);
  }

  // @TODO: Add security instead of guards..
  // @Note: No Guard because used in FE to get the transaction details...
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.transactionService.findOne(+id);
    const transactionItem = await Promise.all(
      response.transactionItem.map(async (item) => {
        return {
          ...item,
          photo: await this.s3Service.getFile(item.menuItem.photo) || '',  
        }
      })
    );
    return {
      ...response,
      transactionItem
    };
  }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('/create-payment')
  create_payment(@Body() payTransactionDto: PayTransactionDto) {
    return this.transactionService.create_payment(payTransactionDto);
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
