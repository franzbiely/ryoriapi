/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch, Res } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { ObjectId } from "mongoose";

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

    @Get()
    async fillAll() {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: ObjectId) {
      return this.reviewsService.findOne(id);
    }

    @Post()
    create(@Body() createReviewsDto: CreateReviewsDto) {
        return this.reviewsService.create(createReviewsDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: ObjectId, @Body() updateReviewsDto: UpdateReviewsDto) {
         this.reviewsService.update(id, updateReviewsDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId) {
        this.reviewsService.remove(id);
      return "Deleted!";
    }
}