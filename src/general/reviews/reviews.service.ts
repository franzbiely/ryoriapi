/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Reviews } from "./reviews.entity";
import { CreateReviewsDto } from './dto/create-reviews.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
    ) {}

            //Get All User
    findAll(): Promise<Reviews[]> {
    return this.reviewsRepository.find({});
    }

    findOne(id: number): Promise<Reviews>{
        const x = this.reviewsRepository.findOneBy({id});
        return x;
    }

    async create(_reviews: CreateReviewsDto): Promise<Reviews>{
        const reviews = new Reviews();
        reviews.description = _reviews.description
        reviews.rating = _reviews.rating
        console.log("USERRR", reviews)
        return this.reviewsRepository.save(reviews);
    }

    async update(id: number, reviews:Reviews) {
        await this.reviewsRepository.update(id, reviews)
    }

    async remove(id: number): Promise<void>{
        await this.reviewsRepository.delete(id);
    }

}