/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Transaction } from "./transaction.entity";
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    //Get All User
    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find({});
    }

    findOne(id: number): Promise<Transaction>{
        const x = this.transactionRepository.findOneBy({id});
        return x;
    }

    async create(_transaction: CreateTransactionDto): Promise<Transaction>{
        const transaction = new Transaction();
        transaction.title = _transaction.title
        transaction.photo = _transaction.photo
        return this.transactionRepository.save(transaction);
    }

    async update(id: number, transaction:Transaction) {
        await this.transactionRepository.update(id, transaction)
    }

    async remove(id: number): Promise<void>{
        await this.transactionRepository.delete(id);
    }

}