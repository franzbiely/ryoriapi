/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch, Res } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from './dto/create-customers.dto';
import { UpdateCustomerDto } from "./dto/update-customers.dto";

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

    @Get()
    async fillAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: ObjectId) {
      return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: ObjectId, @Body() updateCustomerDto: UpdateCustomerDto) {
        //  this.customerService.update(id, updateCustomerDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId) {
        this.customerService.remove(id);
      return "Deleted!";
    }
}