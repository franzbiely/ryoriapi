/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch, Res, forwardRef, Inject } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { FoodService } from "../foods/food.service";

@Controller('category-category')
export class CategoryController {
  constructor(private categoryService: CategoryService,
    @Inject(forwardRef(() => FoodService))
    private readonly foodService: FoodService) {}

    @Get()
    async fillAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.categoryService.findOne(+id);
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
         this.categoryService.update(+id, updateCategoryDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.categoryService.remove(+id);
      return "Deleted!";
    }
}