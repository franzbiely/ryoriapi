import { Injectable } from '@nestjs/common';
import { IUsers } from './user.model';
import { CreateUsersDto } from './dto/create-users.dto';
import { IStore } from '../store/store.model';
import { UpdateUserDto } from './dto/update-users.dto';
import { IBranch } from '../branch/branch.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';
import { IRawGrocery } from 'src/inventory/rawGrocery/rawGrocery.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<IUsers>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('RawGrocery')
    private readonly rawGroceryModel: Model<IRawGrocery>,
    private readonly utils: Utils,
  ) {}

  async userCredential(query: object | any): Promise<IUsers> {
    const x = await this.usersModel
      .findOne(query)
      .populate({
        path: 'store',
        populate: {
          path: 'branches',
        },
      })
      .exec();
    return x;
  }

  async findAll(store_Id: ObjectId, branch_Id: ObjectId): Promise<IUsers[]> {
    if (branch_Id) {
      const branch = await this.branchModel
        .findOne({ _id: branch_Id })
        .populate('users')
        .exec();
      return branch.users;
    }
    return this.usersModel.find({ store: store_Id }).populate('store').exec();
  }

  async findOneId(id: ObjectId): Promise<IUsers> {
    return this.usersModel.findOne({ _id: id }).populate('store').exec();
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
      const store = await this.storeModel
        .findOne({ _id: _user.store_Id })
        .exec();
      store.user = user;
      store.save();
    }

    if (_user.branch_Id) {
      const branch = await this.branchModel
        .findOne({ _id: _user.branch_Id })
        .exec();
      branch.users = await this.utils.pushWhenNew(branch.users, user);
      user.branch = await this.utils.pushWhenNew(user.branch, branch);
      branch.save();
    }

    await user.save();
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const user = await this.usersModel.findOne({ _id: id }).exec();

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

    user.role = updateUserDto.role || user.role;
    user.username = updateUserDto.username || user.username;
    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.email = updateUserDto.email || user.email;
    user.address = updateUserDto.address || user.address;
    user.phone = updateUserDto.phone || user.phone;
    user.userPhoto = updateUserDto.userPhoto || user.userPhoto;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (store_Id) {
      const store = await this.storeModel.findOne({ _id: store_Id }).exec();
      user.store = store;
    }

    await user.save();
    return user;
  }

  // async remove(id: ObjectId): Promise<string> {
  //   const result = await this.usersModel.deleteOne({ _id: id }).exec();
  //   return `Deleted ${result.deletedCount} record`;
  // }
  async remove(id: ObjectId): Promise<string> {
    try {
      const branchModel = await this.branchModel.findOne({ users: id });
      if (!branchModel) {
        throw new Error('BranchModel not found.');
      }

      const result = await this.usersModel.deleteOne({ _id: id }).exec();
      await this.branchModel
        .updateOne({ _id: branchModel._id }, { $pull: { users: id } })
        .exec();
      return `Deleted ${result.deletedCount} record`;
    } catch (error) {
      console.error(error);
      return 'Error deleting record';
    }
  }
}
