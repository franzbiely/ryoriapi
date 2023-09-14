import { Injectable } from '@nestjs/common';
import { IMenuItem } from './menuItem.model';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { IMenuCategory } from '../menuCategory/menuCategory.model';
import { IStore } from 'src/general/store/store.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';
import { IBranch } from 'src/general/branch/branch.model';
import { IUsers } from 'src/general/user/user.model';
import { IBranchItem } from 'src/pos/branchItem/branchItem.model';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('BranchItem')
    private readonly branchItemModel: Model<IBranchItem>,
    @InjectModel('Branch')
    private readonly branchModel: Model<IBranch>,
    @InjectModel('User')
    private readonly userModel: Model<IUsers>,
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    private readonly utils: Utils,
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ storeId: store_Id }).exec();
  }

  async findByBatch(ids: string[]): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ _id: { $in: ids } }).lean();
  }

  // @Todo : Should be transfered to branchItem
  async findAllWithBranchQty(
    store_Id: ObjectId,
    branch_Id: ObjectId,
  ): Promise<IMenuItem[] | any> {
    const branch = await this.branchModel
      .findOne({ _id: branch_Id })
      .populate({
        path: 'branchItems',
        populate: {
          path: 'menuItem',
        },
      })
      .lean();

    const itemsWithQty = branch.branchItems.map((item) => {
      return {
        ...item.menuItem,
        quantity: item.quantity || 0,
      };
    });
    return itemsWithQty;
  }

  async findOne(id: ObjectId): Promise<IMenuItem | any> {
    const ret = await this.branchItemModel
      .findOne({ menuItem: id })
      .populate('menuItem')
      .populate({
        path: 'menuItem',
        populate: {
          path: 'menuCategories',
        },
      })
      .lean();
    console.log({ ret });
    return {
      ...ret.menuItem,
      quantity: ret.quantity,
    };
  }

  async create(
    _menuItem: CreateMenuItemDto,
    user_Id: string,
  ): Promise<IMenuItem> {
    const menuItem = new this.menuItemModel({
      title: _menuItem.title,
      photo: _menuItem.photo || '',
      price: _menuItem.price,
      description: _menuItem.description,
      cookingTime: _menuItem.cookingTime,
    });

    const user = await this.userModel.findOne({ _id: user_Id }).exec();
    menuItem.user = user;

    if (_menuItem.menuCategory_Id) {
      const menuCategory = await this.menuCategoryModel
        .findOne({ _id: _menuItem.menuCategory_Id })
        .exec();

      menuItem.menuCategories = await this.utils.pushWhenNew(
        menuItem.menuCategories,
        menuCategory,
      );
    }

    if (_menuItem.store_Id) {
      const store = await this.storeModel
        .findOne({ _id: _menuItem.store_Id })
        .exec();
      store.menuItems = await this.utils.pushWhenNew(store.menuItems, menuItem);
      store.save();
    }
    if (_menuItem.qty) {
      const branchItem = new this.branchItemModel({
        quantity: _menuItem.qty,
        user: user,
        menuItem: menuItem,
      });
      branchItem.save();
      console.log({ _menuItem });
      const branch = await this.branchModel
        .findOne({ _id: _menuItem.branch_Id })
        .exec();
      console.log({ branch });
      branch.branchItems = await this.utils.pushWhenNew(
        branch.branchItems,
        branchItem,
      );
      branch.save();
    }

    await menuItem.save();
    return menuItem;
  }

  async update(
    id: ObjectId,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<IMenuItem> {
    const menuItem = await this.menuItemModel.findOne({ _id: id }).exec();

    const { title, photo, price, description, cookingTime } = updateMenuItemDto;

    menuItem.title = updateMenuItemDto.title || menuItem.title;
    menuItem.photo = updateMenuItemDto.photo || menuItem.photo;
    menuItem.price = updateMenuItemDto.price || menuItem.price;
    menuItem.description =
      updateMenuItemDto.description || menuItem.description;
    menuItem.cookingTime =
      updateMenuItemDto.cookingTime || menuItem.cookingTime;

    if (updateMenuItemDto.qty) {
      const branchItem = await this.branchItemModel.findOne({ menuItem: id });
      branchItem.quantity = updateMenuItemDto.qty;
      branchItem.save();
    }

    await menuItem.save();
    return menuItem;
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.menuItemModel.deleteOne({ _id: id }).exec();
    await this.branchItemModel.deleteOne({ menuItem: id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
