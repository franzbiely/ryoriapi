/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  OutletService } from "./outlet.service";
import { Outlet } from "./outlet.entity";
import { OutletController } from "./outlet.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Outlet])],
    controllers: [OutletController],
    providers: [OutletService],
})

export class OutletModule{}