/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Item } from "./item.entity";
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) {}

    //Get All User
    findAll(): Promise<Item[]> {
        return this.itemRepository.find({});
    }

    findOne(id: number): Promise<Item>{
        const x = this.itemRepository.findOneBy({id});
        return x;
    }

    async create(_item: CreateItemDto): Promise<Item>{
        const item = new Item();
        item.title = _item.title
        item.photo = _item.photo
        return this.itemRepository.save(item);
    }

    async update(id: number, item:Item) {
        await this.itemRepository.update(id, item)
    }

    async remove(id: number): Promise<void>{
        await this.itemRepository.delete(id);
    }

}