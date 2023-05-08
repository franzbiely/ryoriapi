/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Consumption } from "./consumption.entity";
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Injectable()
export class ConsumptionService {
    constructor(
        @InjectRepository(Consumption)
        private consumptionRepository: Repository<Consumption>,
    ) {}

    //Get All User
    findAll(): Promise<Consumption[]> {
        return this.consumptionRepository.find({});
    }

    findOne(id: number): Promise<Consumption>{
        const x = this.consumptionRepository.findOneBy({id});
        return x;
    }

    async create(_consumption: CreateConsumptionDto): Promise<Consumption>{
        const consumption = new Consumption();
        consumption.title = _consumption.title
        consumption.photo = _consumption.photo
        return this.consumptionRepository.save(consumption);
    }

    async update(id: number, consumption:Consumption) {
        await this.consumptionRepository.update(id, consumption)
    }

    async remove(id: number): Promise<void>{
        await this.consumptionRepository.delete(id);
    }

}