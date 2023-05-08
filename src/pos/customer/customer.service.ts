/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto } from './dto/create-customers.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customertRepository: Repository<Customer>,
    ) {}

            //Get All User
    findAll(): Promise<Customer[]> {
    return this.customertRepository.find({});
    }

    findOne(id: number): Promise<Customer>{
        const x = this.customertRepository.findOneBy({id});
        return x;
    }

    async create(_customer: CreateCustomerDto): Promise<Customer>{
        const customer = new Customer();
        customer.name = _customer.name
        customer.lastName = _customer.lastName
        console.log("USERRR", customer)
        return this.customertRepository.save(customer);
    }

    async update(id: number, customer:Customer) {
        await this.customertRepository.update(id, customer)
    }

    async remove(id: number): Promise<void>{
        await this.customertRepository.delete(id);
    }

}