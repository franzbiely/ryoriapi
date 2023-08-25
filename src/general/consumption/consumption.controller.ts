/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch } from "@nestjs/common";
import { ConsumptionService } from "./consumption.service";
import { CreateConsumptionDto } from "./dto/create-consumption.dto";
import { UpdateConsumptionDto } from "./dto/update-consumption.dto";



@Controller('consumption')
export class ConsumptionController {
    constructor(private consumptionService: ConsumptionService) {}

    @Get()
    async fillAll() {
        return this.consumptionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.consumptionService.findOne(+id);
    }

    @Post()
    create(@Body() createConsumptionDto: CreateConsumptionDto) {
        return this.consumptionService.create(createConsumptionDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateConsumptionDto: UpdateConsumptionDto) {
        //  this.consumptionService.update(+id, updateConsumptionDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.consumptionService.remove(+id);
      return "Deleted!";
    }
}