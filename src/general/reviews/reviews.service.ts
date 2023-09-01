/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from "./dto/update-reviews.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
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

    async findOne(id: ObjectId): Promise<IReviews> {
        const reviews = await this.reviewsModel.findOne({ _id: id }).exec();
        if (!reviews) {
            throw new NotFoundException(`Reviews with id ${id} not found`);
        }
        return reviews;
    }

    async create(_reviews: CreateReviewsDto): Promise<IReviews> {

        const reviews = new this.reviewsModel({
            description: _reviews.description,
            rating: _reviews.rating,
            branch: _reviews.branch_Id
        });
        await reviews.save();
        return reviews
    }

    async update(id: ObjectId, reviews: UpdateReviewsDto) {
        await this.reviewsModel.updateOne({ id }, reviews).exec();
    }

    async remove(id: ObjectId): Promise<string> {
        const result = await this.reviewsModel.deleteOne({ _id : id }).exec();
        return `Deleted ${result.deletedCount} record`;
    }

}