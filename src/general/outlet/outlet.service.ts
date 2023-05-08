/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Outlet } from "./outlet.entity";
import { CreateOutletDto } from './dto/create-outlet.dto';

@Injectable()
export class OutletService {
    constructor(
        @InjectRepository(Outlet)
        private outletRepository: Repository<Outlet>,
    ) {}

            //Get All User
    findAll(): Promise<Outlet[]> {
    return this.outletRepository.find({});
    }

    findOne(id: number): Promise<Outlet>{
        const x = this.outletRepository.findOneBy({id});
        return x;
    }

    async create(_outlet: CreateOutletDto): Promise<Outlet>{
        const outlet = new Outlet();
        outlet.name = _outlet.name
        outlet.address = _outlet.address
        console.log("USERRR", outlet)
        return this.outletRepository.save(outlet);
    }

    async update(id: number, outlet:Outlet) {
        await this.outletRepository.update(id, outlet)
    }

    async remove(id: number): Promise<void>{
        await this.outletRepository.delete(id);
    }

}