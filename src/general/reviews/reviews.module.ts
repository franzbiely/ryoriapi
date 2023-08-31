/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsSchema } from "./reviews.model";

@Module({
    imports:[MongooseModule.forFeature([
        {name: 'Reviews', schema: ReviewsSchema},
    ])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})

export class ReviewsModule{}