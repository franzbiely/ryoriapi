/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Consumption } from "./consumption.entity";
import { ConsumptionController } from "./consumption.controller";
import { ConsumptionService } from "./consumption.service";

@Module({
    imports:[TypeOrmModule.forFeature([Consumption])],
    controllers: [ConsumptionController],
    providers: [ConsumptionService],
})

export class ConsumptionModule{}