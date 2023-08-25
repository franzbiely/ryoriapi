/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IReviews } from "./reviews.model";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel('Reviews')
        private readonly reviewsModel: Model<IReviews>,
    ) { }

    //Get All User
    findAll(): Promise<IReviews[]> {
        return this.reviewsModel.find({});
    }

    async findOne(id: number): Promise<IReviews> {
        const reviews = await this.reviewsModel.findOne({ id }).exec();
        if (!reviews) {
            throw new NotFoundException(`Reviews with id ${id} not found`);
        }
        return reviews;
    }

    async create(_reviews: CreateReviewsDto): Promise<IReviews> {
        const reviews = new this.reviewsModel({
            description: _reviews.description,
            rating: _reviews.rating,
            branchId: _reviews.branch_Id
        });
        return reviews.save();
    }

    async update(id: number, reviews: UpdateReviewsDto) {
        await this.reviewsModel.updateOne({ id }, reviews).exec();
    }

    async remove(id: number): Promise<void> {
        await this.reviewsModel.deleteOne({ id }).exec();
    }

}