import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Store } from '../store/store.entity';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Users } from '../user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  //Get All User
  findAll(): Promise<Branch[]> {
    return this.branchRepository.find({});
  }

  async findOneId(id: number): Promise<Branch> {
    const getOneById = this.branchRepository.findOne({
      where: {
        id: id,
      },
      relations: ['store', 'user'],
    });
    return getOneById;
  }

  async create(_branch: CreateBranchDto): Promise<Branch> {
    const branch = new Branch();
    branch.name = _branch.name;
    branch.email = _branch.email;
    branch.contactNumber = _branch.contactNumber;
    branch.address = _branch.address;
    console.log('Branch', { _branch });
    if (_branch.store_Id) {
      console.log('hello world');
      const store = await this.storeRepository.findOne({
        where: { id: _branch.store_Id },
      });
      console.log({ store });
      branch.store = store;
    }

    if (_branch.user_Id) {
      const user = await this.userRepository.findOne({
        where: { id: _branch.user_Id },
      });
      // console.log({ user });
      branch.user = [user];
    }
    console.log({ branch });
    return this.branchRepository.save(branch);
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOneId(id);

    const { name, email, address, contactNumber, store_Id, user_Id } =
      updateBranchDto;
    branch.name = name;
    branch.email = email;
    branch.address = address;
    branch.contactNumber = contactNumber;

    if (store_Id) {
      const store = await this.storeRepository.findOne({
        where: { id: store_Id },
      });
      branch.store = store;
    }

    if (user_Id) {
      const user = await this.userRepository.findOne({
        where: { id: user_Id },
      });
      branch.user = [user];
    }

    return this.branchRepository.save(branch);
  }

  async remove(id: number): Promise<void> {
    await this.branchRepository.delete(id);
  }
}
