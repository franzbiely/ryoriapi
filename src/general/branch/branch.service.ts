import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Store } from '../store/store.entity';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
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

    if (_branch.storeId) {
      const storeBranchID = await this.storeRepository.findOne({
        where: { id: _branch.storeId },
      });
      branch.store = storeBranchID;
    }
    return this.branchRepository.save(branch);
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);

    const { name, email, address, contactNumber, storeId } = updateBranchDto;
    branch.name = name;
    branch.email = email;
    branch.address = address;
    branch.contactNumber = contactNumber;

    if (storeId) {
      const store = await this.storeRepository.findOne({
        where: { id: storeId },
      });
      branch.store = store;
    }
    return this.branchRepository.save(branch);
  }

  async remove(id: number): Promise<void> {
    await this.branchRepository.delete(id);
  }
}
