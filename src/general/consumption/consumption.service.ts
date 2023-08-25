/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IConsumption } from "./consumption.model";
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Injectable()
export class ConsumptionService {
    constructor(
        @InjectModel('Consumption')
        private readonly consumptionModel: Model<IConsumption>,
    ) { }

    //Get All User
    findAll(): Promise<IConsumption[]> {
        return this.consumptionModel.find({});
    }

    async findOne(id: number): Promise<IConsumption> {
        const consumption = await this.consumptionModel.findOne({ id }).exec();
        if (!consumption) {
            throw new NotFoundException(`Consumption with id ${id} not found`);
        }
        return consumption;
    }

    async create(_consumption: CreateConsumptionDto): Promise<IConsumption> {
        const consumption = new this.consumptionModel({
            title: _consumption.title,
            photo: _consumption.photo,
        });
        await consumption.save();
        return consumption
    }

    async update(id: number, _consumption: IConsumption): Promise<void> {
        await this.consumptionModel.updateOne({ id }, _consumption).exec();
    }

    async remove(id: number): Promise<void> {
        await this.consumptionModel.deleteOne({ id }).exec();
    }

}