/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  CustomerService } from "./customer.service";
import { Customer } from "./customer.entity";
import { CustomerController } from "./customer.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerService],
})

export class CustomerModule{}