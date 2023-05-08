/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Store } from "./store.entity";
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) {}

            //Get All food
    findAll(): Promise<Store[]> {
    return this.storeRepository.find({});
    }

    findOne(id: number): Promise<Store>{
        const x = this.storeRepository.findOneBy({id});
        return x;
    }

    async create(_store: CreateStoreDto): Promise<Store>{
        const store = new Store();
        store.address = _store.address
        store.storeName = _store.storeName
        return this.storeRepository.save(store);
    }
    
    async update(id: number, store:Store) {
        await this.storeRepository.update(id, store)
    }

    async remove(id: number): Promise<void>{
        await this.storeRepository.delete(id);
    }

}