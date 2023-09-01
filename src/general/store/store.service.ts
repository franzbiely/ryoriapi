import { Injectable, NotFoundException } from '@nestjs/common';
import { IStore } from './store.model';
import { CreateStoreDto } from './dto/create-store.dto';
import { IBranch } from '../branch/branch.model';
import { IUsers } from '../user/user.model';
import { UpdateStoreDto } from './dto/update-store.dto';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

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
  findAll(): Promise<IStore[]> {
    return this.storeModel.find({});
  }

  async findOneId(id: ObjectId): Promise<IStore> {
    const store = await this.storeModel
      .findOne({ _id: id })
      .populate('user')
      .populate('menuItem')
      .exec();
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  async findStoreAndBranch(sid: ObjectId, bid: ObjectId): Promise<IBranch> {
    const branch = await this.branchModel
      .findOne({ _id: bid })
      .populate({ path: 'store', populate: { path: 'user' } })
      .exec();
    if (!branch) {
      throw new NotFoundException(`Branch with id ${bid} not found`);
    }
    return branch;
  }

  async create(_store: CreateStoreDto): Promise<IStore | void> {
    const store = new this.storeModel({
      storeName: _store.storeName,
      photo: _store.photo || '',
      appId: _store.appId,
      appSecret: _store.appSecret,
    });

    if (_store.user_Id) {
      const user = await this.usersModel.findOne({ _id: _store.user_Id }).exec();
      store.user = [user];
      user.store = store;
      await user.save();
    }

    if (_store.branchName) {
      const branch = new this.branchModel({
        branchName: _store.branchName,
        email: _store.email || '',
        contactNumber: _store.contactNumber || '',
        address: _store.address || '',
        store: store._id,
      });
      store.branch.push(branch);
      await branch.save();
    }

    const result = await store.save();

    return result;
  }

  async update(id: ObjectId, updateStoreDto: UpdateStoreDto): Promise<IStore> {
    const store = await this.storeModel.findOne({ _id: id }).exec();
    const { storeName, appId, appSecret, photo, user_Id, branch_Id } =
      updateStoreDto;
    store.storeName = storeName;
    store.photo = photo;
    store.appId = appId;
    store.appSecret = appSecret;

    if (user_Id) {
      const user = await this.usersModel.findOne({ _id: user_Id });
      store.user = [user];
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
