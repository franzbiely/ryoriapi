import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { Store } from '../store/store.entity';
import { UpdateUserDto } from './dto/update-users.dto';
import { Branch } from '../branch/branch.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  userCredential(query: object | any): Promise<Users> {
    const x = this.usersRepository.findOne({
      where: query,
      relations: ['store', 'branch'],
    });
    return x;
  }

  async findAll(store_Id: number): Promise<Users[]> {
    return this.usersRepository.find({
      where: {
        store: {
          id: store_Id,
        },
      },
      relations: ['store'],
    });
  }

  async findOneId(id: number): Promise<Users> {
    const getOneById = this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['store'],
    });
    return getOneById;
  }

  async create(_user: CreateUsersDto): Promise<Users> {
    const user = new Users();
    user.role = _user.role || 'admin';
    user.username = _user.username;
    user.firstName = _user.firstName;
    user.lastName = _user.lastName;
    user.email = _user.email;
    user.password = _user.password;
    user.address = _user.address || '';
    user.phone = _user.phone;
    user.userPhoto = _user.userPhoto;

    if (_user.store_Id) {
      const store = await this.storeRepository.findOne({
        where: { id: _user.store_Id },
      });
      user.store = store;
    }

    if (_user.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _user.branch_Id },
      });
      user.branch = [branch];
    }
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.findOneId(id);
    console.log({ updateUserDto, user });
    const {
      role,
      username,
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
      userPhoto,
      store_Id,
      branch_Id,
    } = updateUserDto;

    user.role = role;
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.userPhoto = userPhoto;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (store_Id) {
      const store = await this.storeRepository.findOne({
        where: { id: store_Id },
      });
      user.store = store;
    }

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      user.branch = [branch];
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
