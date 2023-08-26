import { Injectable, NotFoundException } from '@nestjs/common';
import { IBranch } from './branch.model';
import { CreateBranchDto } from './dto/create-branch.dto';
import { IStore } from '../store/store.model';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { IUsers } from '../user/user.model';
import { IMenuItem } from 'src/pos/product/menuItem/menuItem.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

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
  ) { }

  //Get All User
  findAll(store_Id: ObjectId): Promise<IBranch[]> {
    return this.branchModel
      .find({ storeId: store_Id })
      .populate('store')
      .exec();
  }

  async findOneId(id: ObjectId): Promise<IBranch> {
    return this.branchModel
      .findOne({ _id: id })
      .populate('store')
      .populate('user')
      .exec();
  }

  async create(_branch: CreateBranchDto): Promise<IBranch> {
    const branch = new this.branchModel(_branch);
    branch.branchName = _branch.branchName;
    branch.email = _branch.email;
    branch.contactNumber = _branch.contactNumber;
    branch.address = _branch.address;

    if (_branch.store_Id) {
      const store = await this.storeModel.findOne({ _id: _branch.store_Id });
      branch.store = store._id;
    }

    if (_branch.user_Id) {
      const user = await this.userModel.findOne({ _id: _branch.user_Id });
      branch.user = [user._id];
    }
    await branch.save();
    return branch
  }

  async update(id: ObjectId, updateBranchDto: UpdateBranchDto): Promise<IBranch> {
    const branch = await this.branchModel.findOne({_id:id});

    if (!branch) {
      throw new NotFoundException(`Branch with id ${id} not found`);
    }

    const { branchName, email, address, contactNumber, store_Id, user_Id } =
      updateBranchDto;
    branch.branchName = branchName;
    branch.email = email;
    branch.address = address;
    branch.contactNumber = contactNumber;

    if (store_Id) {
      const store = await this.storeModel.findOne({ _id: store_Id });
      branch.store = store._id;
    }

    if (user_Id) {
      const user = await this.userModel.findOne({ _id: user_Id });
      branch.user = [user._id];
    }

    await branch.save();
    return branch
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.branchModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
