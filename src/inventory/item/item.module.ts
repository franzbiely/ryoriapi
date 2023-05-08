/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";

@Module({
    imports:[TypeOrmModule.forFeature([Item])],
    controllers: [ItemController],
    providers: [ItemService],
})

export class ItemModule{}