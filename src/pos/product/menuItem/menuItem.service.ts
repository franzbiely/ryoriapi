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
    private readonly utils: Utils
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ storeId: store_Id }).exec();
  }

  async findByBatch(ids: string[]): Promise<IMenuItem[]> {
    return this.menuItemModel.find({ _id: { $in: ids } }).lean();
  }

  // @Todo : Should be transfered to branchItem
  async findAllWithBranchQty(store_Id: ObjectId, branch_Id: ObjectId): Promise<IMenuItem[] | any> {
    const branch = await this.branchModel.find({ _id: branch_Id }).populate('branchItems').lean();
    console.log({branch})
    // const itemsWithQty = branch.branchItems.map(item => {

    // })
  //   if(menuItems.length > 0) {
  //     return menuItems.map((item) => {
  //       const newBranch = item.branchItem.filter(
  //         (subItem) => subItem['_id'] === branch_Id,
  //       );

  //       return {
  //         ...item.toObject(),
  //         branchItem: undefined,
  //         quantity: newBranch[0]?.quantity || 0,
  //       };
  //     });
  //   }
  //   return []
  }

  findOne(id: ObjectId): Promise<IMenuItem> {
    return this.menuItemModel.findOne({_id:id}).lean();
  }

  async create(_menuItem: CreateMenuItemDto, user_Id:string): Promise<IMenuItem> {
    
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
      const menuCategory = await this.menuCategoryModel.findOne({ _id: _menuItem.menuCategory_Id }).exec();
      menuItem.menuCategories = await this.utils.pushWhenNew(menuItem.menuCategories, menuCategory);
      console.log({menuItem}, 2)
    }
    console.log({menuItem}, 1)

    if (_menuItem.store_Id) {
      const store = await this.storeModel.findOne({ _id: _menuItem.store_Id }).exec();
      store.menuItems = await this.utils.pushWhenNew(store.menuItems, menuItem);
      store.save();
    }
    
    if (_menuItem.qty) {
      const branchItem = new this.branchItemModel({
        quantity: _menuItem.qty,
        user: user,
        menuItem: menuItem
      });      
      branchItem.save();
    }

    console.log({menuItem})
    
    await menuItem.save();
    return menuItem
  }

  async update(id: ObjectId, updateMenuItemDto: UpdateMenuItemDto): Promise<IMenuItem> {
    const menuItem = await this.menuItemModel.findOne({_id:id}).exec();

    const { title, photo, price, description, cookingTime } =
      updateMenuItemDto;

    menuItem.title = updateMenuItemDto.title || menuItem.title;
    menuItem.photo = updateMenuItemDto.photo || photo;
    menuItem.price = updateMenuItemDto.price || price;
    menuItem.description = updateMenuItemDto.description || description;
    menuItem.cookingTime = updateMenuItemDto.cookingTime || cookingTime;

    await menuItem.save();
    return menuItem
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.menuItemModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
