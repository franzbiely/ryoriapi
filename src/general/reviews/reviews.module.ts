/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  ReviewsService } from "./reviews.service";
import { Reviews } from "./reviews.entity";
import { ReviewsController } from "./reviews.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Reviews])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})

export class ReviewsModule{}