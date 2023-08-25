import { Injectable, NotFoundException } from '@nestjs/common';
import { IStore } from './store.model';
import { CreateStoreDto } from './dto/create-store.dto';
import { IBranch } from '../branch/branch.model';
import { IUsers } from '../user/user.model';
import { UpdateStoreDto } from './dto/update-store.dto';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async findOneId(id: number): Promise<IStore> {
    const store = await this.storeModel.findOne({ id }).populate('user').exec();
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  async findStoreAndBranch(sid: number, bid: number): Promise<IBranch> {
    const branch = await this.branchModel.findOne({ id: bid })
      .populate({ path: 'store', populate: { path: 'user' } })
      .exec();
    if (!branch) {
      throw new NotFoundException(`Branch with id ${bid} not found`);
    }
    return branch;
  }

  async create(_store: CreateStoreDto): Promise<IStore> {
    const store = new this.storeModel({
      storeName: _store.storeName,
      photo: _store.photo || '',
      appId: _store.appId,
      appSecret: _store.appSecret,
    });

    if (_store.user_Id) {
      const user = await this.usersModel.findOne({ id: _store.user_Id });
      store.user = [user.id];
    }

    const result = await store.save();

    if (_store.branchName) {
      const branch = new this.branchModel({
        branchName: _store.branchName,
        email: _store.email || '',
        contactNumber: _store.contactNumber || '',
        address: _store.address || '',
        store: store._id,
      });
      await branch.save();
    }

    return result;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<IStore> {
    const store = await this.storeModel.findOne({id});
    const { storeName, appId, appSecret, photo, user_Id, branch_Id } = updateStoreDto;
    store.storeName = storeName;
    store.photo = photo;
    store.appId = appId;
    store.appSecret = appSecret;

    if (user_Id) {
      const user = await this.usersModel.findOne({ id: user_Id });
      store.user = [user.id];
    }

    if (branch_Id) {
      const branch = await this.branchModel.findOne({ id: branch_Id });
      branch.branchName = updateStoreDto.branchName;
      branch.email = updateStoreDto.email;
      branch.contactNumber = updateStoreDto.contactNumber;
      branch.address = updateStoreDto.address;
      await branch.save();
    }

    await store.save();
    return store
  }

  async remove(id: number): Promise<void> {
    await this.storeModel.deleteOne({ id }).exec();
  }
}
