import { Injectable, NotFoundException } from '@nestjs/common';
import { IStore } from './store.model';
import { CreateStoreDto } from './dto/create-store.dto';
import { IBranch } from '../branch/branch.model';
import { IUsers } from '../user/user.model';
import { UpdateStoreDto } from './dto/update-store.dto';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('Users')
    private readonly usersModel: Model<IUsers>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
  ) {}

  //Get All food
  findAll(store_Id): Promise<IStore[]> {
    return this.storeModel
      .find({ _id: store_Id })
      .populate('branches')
      .populate('menuCategories');
  }

  async findOneId(id: ObjectId): Promise<IStore> {
    const store = await this.storeModel
      .findOne({ _id: id })
      .populate('user')
      .exec();
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  async findStoreAndBranch(
    sid: ObjectId,
    bid: ObjectId,
  ): Promise<IStore | any> {
    const store = await this.storeModel
      .findOne({ _id: sid })
      .populate({
        path: 'branches',
        populate: {
          path: 'users',
        },
      })
      .lean();
    if (!store) {
      throw new NotFoundException(`Store with id ${sid} not found`);
    }
    return store;
  }

  async create(_store: CreateStoreDto): Promise<IStore | void> {
    const store = new this.storeModel({
      storeName: _store.storeName,
      photo: _store.photo || '',
      appId: _store.appId,
      appSecret: _store.appSecret,
    });

    if (_store.user_Id) {
      const user = await this.usersModel
        .findOne({ _id: _store.user_Id })
        .exec();
      user.store = store;
      await user.save();
    }

    if (_store.branchName) {
      const branch = new this.branchModel({
        branchName: _store.branchName,
        email: _store.email || '',
        contactNumber: _store.contactNumber || '',
        address: _store.address || '',
      });
      store.branches.push(branch);
      await branch.save();
    }
    const result = await store.save();

    return result;
  }

  async update(id: ObjectId, updateStoreDto: UpdateStoreDto): Promise<IStore> {
    const store = await this.storeModel.findOne({ _id: id }).exec();
    const { storeName, appId, appSecret, photo, user_Id, branch_Id } =
      updateStoreDto;
    store.storeName = updateStoreDto.storeName || store.storeName;
    store.photo = updateStoreDto.photo || store.photo;
    store.appId = updateStoreDto.appId || store.appId;
    store.appSecret = updateStoreDto.appSecret || store.appSecret;

    if (user_Id) {
      const user = await this.usersModel.findOne({ _id: user_Id });
      store.user = user;
    }

    if (branch_Id) {
      const branch = await this.branchModel.findOne({ _id: branch_Id }).exec();
      branch.branchName = updateStoreDto.branchName;
      branch.email = updateStoreDto.email;
      branch.contactNumber = updateStoreDto.contactNumber;
      branch.address = updateStoreDto.address;
      await branch.save();
    }

    await store.save();
    return store;
  }

  async remove(id: ObjectId): Promise<string> {
    const result = await this.storeModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
