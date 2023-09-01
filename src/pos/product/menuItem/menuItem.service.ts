import { Injectable } from '@nestjs/common';
import { IMenuItem } from './menuItem.model';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { IMenuCategory } from '../menuCategory/menuCategory.model';
import { IStore } from 'src/general/store/store.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    private readonly utils: Utils
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ storeId: store_Id }).exec();
  }

  async findByBatch(ids: string[]): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ _id: { $in: ids } }).lean();
  }

  async findAllWithBranchQty(store_Id: ObjectId, branch_Id: ObjectId): Promise<IMenuItem[] | any> {
    const menuItems = await this.menuItemModel.find({ store: store_Id }).exec();
    console.log({menuItems})

    if(menuItems.length > 0) {
      return menuItems.map((item) => {
        const newBranch = item.branchItem.filter(
          (subItem) => subItem['_id'] === branch_Id,
        );

        return {
          ...item.toObject(),
          branchItem: undefined,
          quantity: newBranch[0]?.quantity || 0,
        };
      });
    }
    return []
  }

  findOne(id: ObjectId): Promise<IMenuItem> {
    return this.menuItemModel.findOne({_id:id}).lean();
  }

  async create(_menuItem: CreateMenuItemDto): Promise<IMenuItem> {
    console.log({_menuItem})
    const menuItem = new this.menuItemModel({
      title: _menuItem.title,
      photo: _menuItem.photo || '',
      price: _menuItem.price,
      description: _menuItem.description,
      cookingTime: _menuItem.cookingTime,
    });

    if (_menuItem.category_Id) {
      const menuCategory = await this.menuCategoryModel.findOne({_id:_menuItem.category_Id}).exec();
      menuItem.menuCategory = await this.utils.pushWhenNew(menuItem.menuCategory, menuCategory);
      menuItem.save();
    }

    if (_menuItem.store_Id) {
      const store = await this.storeModel.findOne({_id: _menuItem.store_Id}).exec();
      menuItem.store = store;
      store.menuItem = await this.utils.pushWhenNew(store.menuItem, menuItem);
      store.save();
    }
    
    await menuItem.save();
    return menuItem
  }

  async update(id: ObjectId, updateMenuItemDto: UpdateMenuItemDto): Promise<IMenuItem> {
    const menuItem = await this.menuItemModel.findOne({_id:id});

    const { title, photo, price, description, cookingTime, category_Id } =
      updateMenuItemDto;

    menuItem.title = title;
    menuItem.photo = photo;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.cookingTime = cookingTime;

    if (category_Id) {
      const menuCategory = await this.menuCategoryModel.findOne({_id:category_Id}).exec();
      menuItem.menuCategory = [menuCategory];
      menuItem.menuCategory = await this.utils.pushWhenNew(menuItem.menuCategory, menuCategory);
      menuItem.save();
    }

    await menuItem.save();
    return menuItem
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.menuItemModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
