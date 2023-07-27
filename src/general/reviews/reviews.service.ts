/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Reviews } from "./reviews.entity";
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from "./dto/update-reviews.dto";

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
        reviews.branchId = _reviews.branch_Id
        
        return this.reviewsRepository.save(reviews);
    }

    async update(id: number, reviews:UpdateReviewsDto) {
        await this.reviewsRepository.update(id, reviews)
    }

    async remove(id: number): Promise<void>{
        await this.reviewsRepository.delete(id);
    }

}