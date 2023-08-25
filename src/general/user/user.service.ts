import { Injectable } from '@nestjs/common';
import { IUsers } from './user.model';
import { CreateUsersDto } from './dto/create-users.dto';
import { IStore } from '../store/store.model';
import { UpdateUserDto } from './dto/update-users.dto';
import { IBranch } from '../branch/branch.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<IUsers>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
  ) {}

  userCredential(query: object | any): Promise<IUsers> {
    const x = this.usersModel.findOne({
      where: query,
      relations: ['store', 'branch'],
    });
    return x;
  }

  async findAll(store_Id: number): Promise<IUsers[]> {
    return this.usersModel.find({
      where: {
        store: {
          id: store_Id,
        },
      },
      relations: ['store'],
    });
  }

  async findOneId(id: number): Promise<IUsers> {
    const getOneById = this.usersModel.findOne({
      where: {
        id: id,
      },
      relations: ['store'],
    });
    return getOneById;
  }

  async create(_user: CreateUsersDto): Promise<IUsers> {
    const user = new this.usersModel({
      role: _user.role || 'admin',
      username: _user.username,
      firstName: _user.firstName,
      lastName: _user.lastName,
      email: _user.email,
      password: _user.password,
      address: _user.address || '',
      phone: _user.phone,
      userPhoto: _user.userPhoto,
    });

    if (_user.store_Id) {
      const store = await this.storeModel.findOne({ id: _user.store_Id });
      user.store = store._id;
    }

    if (_user.branch_Id) {
      const branch = await this.branchModel.findOne({ id: _user.branch_Id });
      user.branch = [branch._id];
    }

    return user.save();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const user = await this.usersModel.findOne({id});
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
      const store = await this.storeModel.findOne({ id: store_Id });
      user.store = store._id;
    }

    if (branch_Id) {
      const branch = await this.branchModel.findOne({ id: branch_Id });
      user.branch = [branch._id];
    }

    return user.save();
  }

  async remove(id: number): Promise<void> {
    await this.usersModel.deleteOne({ id }).exec();
  }
}
