import { Injectable, NotFoundException } from '@nestjs/common';
import { IBranch } from './branch.model';
import { CreateBranchDto } from './dto/create-branch.dto';
import { IStore } from '../store/store.model';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { IUsers } from '../user/user.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('Users')
    private readonly userModel: Model<IUsers>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    private readonly utils: Utils
  ) {}

  //Get All User
  async findAll(store_Id: ObjectId): Promise<IBranch[]|any> {
    const store = await this.storeModel
      .findOne({
        _id: store_Id,
      })
      .populate('branches')
      .lean();
    
    return store.branches
  }

  async findOneId(id: ObjectId): Promise<IBranch> {
    return this.branchModel
      .findOne({ _id: id })
      .lean();
  }

  async create(_branch: CreateBranchDto): Promise<IBranch> {
    const branch = new this.branchModel(_branch);
    branch.branchName = _branch.branchName;
    branch.email = _branch.email;
    branch.contactNumber = _branch.contactNumber;
    branch.address = _branch.address;

    if (_branch.user_Id) {
      const user = await this.userModel.findOne({ _id: _branch.user_Id }).exec();
      branch.users = [user];
    }

    await branch.save();

    if (_branch.store_Id) {
      const store = await this.storeModel.findOne({ _id: _branch.store_Id }).exec();
      store.branches = await this.utils.pushWhenNew(store.branches, branch);
      store.save();
    }
    
    return branch;  
  }

  async update(
    id: ObjectId,
    updateBranchDto: UpdateBranchDto,
  ): Promise<IBranch> {
    const branch = await this.branchModel.findOne({ _id: id }).exec();

    if (!branch) {
      throw new NotFoundException(`Branch with id ${id} not found`);
    }

    const { branchName, email, address, contactNumber, user_Id } =
      updateBranchDto;
    branch.branchName = updateBranchDto.branchName || branch.branchName;
    branch.email = updateBranchDto.email || branch.email;
    branch.address = updateBranchDto.address || branch.address;
    branch.contactNumber = updateBranchDto.contactNumber || branch.contactNumber;

    if (user_Id) {
      const user = await this.userModel.findOne({ _id: user_Id }).exec();
      branch.users = [user];
      user.branch = await this.utils.pushWhenNew(user.branch, branch);
      user.save()
    }

    await branch.save();
    return branch;
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.branchModel.deleteOne({ _id: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}

