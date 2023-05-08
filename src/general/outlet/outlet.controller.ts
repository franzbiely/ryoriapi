/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch, Res } from "@nestjs/common";
import { OutletService } from "./outlet.service";
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from "./dto/update-outlet.dto";

@Controller('outlet')
export class OutletController {
  constructor(private outletService: OutletService) {}

    @Get()
    async fillAll() {
        return this.outletService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.outletService.findOne(+id);
    }

    @Post()
    create(@Body() createOutletDto: CreateOutletDto) {
        return this.outletService.create(createOutletDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOutletDto: UpdateOutletDto) {
         this.outletService.update(+id, updateOutletDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.outletService.remove(+id);
      return "Deleted!";
    }
}