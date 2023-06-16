/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  //Get All User
  findAll(): Promise<Branch[]> {
    return this.branchRepository.find({});
  }

  findOne(id: number): Promise<Branch> {
    const x = this.branchRepository.findOneBy({ id });
    return x;
  }

  async create(_branch: CreateBranchDto): Promise<Branch> {
    const branch = new Branch();
    branch.name = _branch.name;
    branch.email = _branch.email;
    branch.contactNumber = _branch.contactNumber;
    branch.address = _branch.address;
    console.log('Branch', branch);
    return this.branchRepository.save(branch);
  }

  async update(id: number, branch: Branch) {
    await this.branchRepository.update(id, branch);
  }

  async remove(id: number): Promise<void> {
    await this.branchRepository.delete(id);
  }
}
