import { Injectable } from '@nestjs/common';
import { IUsers } from './user.model';
import { CreateUsersDto } from './dto/create-users.dto';
import { IStore } from '../store/store.model';
import { UpdateUserDto } from './dto/update-users.dto';
import { IBranch } from '../branch/branch.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';


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

  async userCredential(query: object | any): Promise<IUsers> {
    const x = await this.usersModel.findOne(query)
      .populate('store')
      .populate('branch')
      .exec();
    return x;
  }

  async findAll(store_Id: ObjectId): Promise<IUsers[]> {
    return this.usersModel
      .find({ store: store_Id })
      .populate('store')
      .exec();
  }

  async findOneId(id: ObjectId): Promise<IUsers> {
    return this.usersModel
      .findOne({ _id: id })
      .populate('store')
      .exec();
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
      const store = await this.storeModel.findOne({ _id: _user.store_Id });
      user.store = store;
    }

    if (_user.branch_Id) {
      const branch = await this.branchModel.findOne({ _id: _user.branch_Id });
      user.branch = [branch];
    }
    await user.save()
    return user
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const user = await this.usersModel.findOne({_id: id});
    
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

    console.log({
      user
    })
    user.role = role;
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.userPhoto = userPhoto;

    console.log({user})

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (store_Id) {
      const store = await this.storeModel.findOne({ _id: store_Id });
      console.log({store})
      user.store = store;
    }

    if (branch_Id) {
      const branch = await this.branchModel.findOne({ _id: branch_Id });
      user.branch = [branch];
    }

    await user.save();
    return user
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.usersModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
