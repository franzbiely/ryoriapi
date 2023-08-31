/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import {  CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerSchema } from "./customer.model";

@Module({
    imports:[MongooseModule.forFeature([
        { name: 'Customer', schema: CustomerSchema }
        
    ])],
    controllers: [CustomerController],
    providers: [CustomerService],
})

export class CustomerModule{}