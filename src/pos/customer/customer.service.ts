/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ICustomer } from "./customer.model";
import { CreateCustomerDto } from './dto/create-customers.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer')
        private readonly customerModel: Model<ICustomer>,
    ) { }

    findAll(): Promise<ICustomer[]> {
        return this.customerModel.find().exec();
    }

    findOne(id: ObjectId): Promise<ICustomer> {
        return this.customerModel.findOne({_id:id}).exec();
    }

    async create(_customer: CreateCustomerDto): Promise<ICustomer> {
        const customer = new this.customerModel({
            name: _customer.name,
            lastName: _customer.lastName,
        });

        await customer.save();
        return customer
    }

    async update(id: ObjectId, customer: ICustomer): Promise<ICustomer> {
        return this.customerModel.findByIdAndUpdate(id, customer, { new: true }).exec();
    }

    async remove(id: ObjectId): Promise<string> {
        const result = await this.customerModel.deleteOne({ _id: id }).exec();
        return `Deleted ${result.deletedCount} record`;
    }

}