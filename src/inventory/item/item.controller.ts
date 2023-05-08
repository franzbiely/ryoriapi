/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch } from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";



@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Get()
    async fillAll() {
        return this.itemService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.itemService.findOne(+id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.create(createItemDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
         this.itemService.update(+id, updateItemDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.itemService.remove(+id);
      return "Deleted!";
    }
}