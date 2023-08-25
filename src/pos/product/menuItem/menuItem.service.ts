import { Injectable } from '@nestjs/common';
import { IMenuItem } from './menuItem.model';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { IMenuCategory } from '../menuCategory/menuCategory.model';
import { IStore } from 'src/general/store/store.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ storeId: store_Id }).exec();
  }

  async findByBatch(ids: string[]): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ id: { $in: ids } }).exec();
  }

  async findAllWithBranchQty(store_Id: ObjectId, branch_Id: ObjectId): Promise<IMenuItem[] | any> {
    const menuItems = await this.menuItemModel.find({ storeId: store_Id }).exec();

    // return menuItems.map((item) => {
    //   const newBranch = item.branchItem.filter(
    //     (subItem) => subItem.branchId === branch_Id,
    //   );

    //   return {
    //     ...item.toObject(),
    //     branchItem: undefined,
    //     quantity: newBranch[0]?.quantity || 0,
    //   };
    // });
  }

  findOne(id: ObjectId): Promise<IMenuItem> {
    return this.menuItemModel.findById(id).exec();
  }

  async create(_menuItem: CreateMenuItemDto): Promise<IMenuItem> {
    const menuItem = new this.menuItemModel({
      title: _menuItem.title,
      photo: _menuItem.photo || '',
      price: _menuItem.price,
      description: _menuItem.description,
      cookingTime: _menuItem.cookingTime,
    });

    // if (_menuItem.category_Id) {
    //   const menuCategory = await this.menuCategoryModel.findById(_menuItem.category_Id).exec();
    //   menuItem.menuCategory = [menuCategory];
    // }

    // if (_menuItem.store_Id) {
    //   const store = await this.storeModel.findById(_menuItem.store_Id).exec();
    //   menuItem.store = store;
    // }

    await menuItem.save();
    return menuItem
  }

  async update(id: ObjectId, updateMenuItemDto: UpdateMenuItemDto): Promise<IMenuItem> {
    const menuItem = await this.menuItemModel.findOne({id});

    const { title, photo, price, description, cookingTime, category_Id } =
      updateMenuItemDto;

    menuItem.title = title;
    menuItem.photo = photo;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.cookingTime = cookingTime;

    // if (category_Id) {
    //   const menuCategory = await this.menuCategoryModel.findById(category_Id).exec();
    //   menuItem.menuCategory = [menuCategory];
    // }

    await menuItem.save();
    return menuItem
  }

  async remove(id: ObjectId): Promise<void> {
    await this.menuItemModel.findByIdAndDelete(id).exec();
  }
}
