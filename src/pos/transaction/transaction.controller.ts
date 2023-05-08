/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";



@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get()
    async fillAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.transactionService.findOne(+id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
         this.transactionService.update(+id, updateTransactionDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.transactionService.remove(+id);
      return "Deleted!";
    }
}