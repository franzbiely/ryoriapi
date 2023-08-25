/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConsumptionController } from "./consumption.controller";
import { ConsumptionService } from "./consumption.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConsumptionSchema } from "./consumption.model";

@Module({
    imports:[MongooseModule.forFeature([
        {name: 'Consumption', schema: ConsumptionSchema},
    ])],
    controllers: [ConsumptionController],
    providers: [ConsumptionService],
})

export class ConsumptionModule{}