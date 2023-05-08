/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch, Res } from "@nestjs/common";
import { FoodService } from "../foods/food.service";
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from "./dto/update-food.dto";

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

    @Get()
    async fillAll() {
        return this.foodService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.foodService.findOne(+id);
    }

    @Post()
    create(@Body() createFoodDto: CreateFoodDto) {
        return this.foodService.create(createFoodDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
      this.foodService.update(+id, updateFoodDto);
      return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.foodService.remove(+id);
      return "Deleted!";
    }
}