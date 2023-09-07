import { Injectable } from '@nestjs/common';
import { IMenuCategory } from './menuCategory.model';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { IStore } from 'src/general/store/store.model';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';
import { S3Service } from 'src/utils/S3Service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Utils } from 'src/utils/utils';
import { IMenuItem } from '../menuItem/menuItem.model';
@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    @InjectModel('MenuItem')
    private readonly menuItemModel: Model<IMenuItem>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    // private readonly s3Service: Model<S3Service>,
    private readonly utils: Utils
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuCategory[]> {
    return this.menuCategoryModel.find({ store: store_Id }).lean();
  }

  findOneId(id: ObjectId): Promise<IMenuCategory> {
    return this.menuCategoryModel.findOne({_id:id}).lean();
  }

  async create(_menuCategory: CreateMenuCategoryDto): Promise<IMenuCategory> {
    try {
      const menuCategory = new this.menuCategoryModel({
        title: _menuCategory.title,
        photo: _menuCategory.photo || '',
      });

      if (_menuCategory.store_Id) {
        const store = await this.storeModel.findOne({_id: _menuCategory.store_Id}).exec();
        store.menuCategories = await this.utils.pushWhenNew(store.menuCategories, menuCategory);
        store.save()        
      }

      if (_menuCategory.menuItem_Id) {
        const menuItem = await this.menuItemModel.findOne({_id: _menuCategory.menuItem_Id}).exec();
        menuItem.menuCategories = await this.utils.pushWhenNew(menuItem.menuCategories, menuCategory);
        menuItem.save()        
      }

      await menuCategory.save();
      return menuCategory
    }catch (error) {
      throw new Error(`Error : ` + JSON.stringify(error));
    }
  }

  async update(id: ObjectId, menuCategoryDto: UpdateMenuCategoryDto): Promise<IMenuCategory> {
    const menuCategory = await this.menuCategoryModel.findOne({_id:id}).exec();

    const { title, photo, store_Id } = menuCategoryDto;
    menuCategory.title = menuCategoryDto.title || menuCategory.title;
    menuCategory.photo = menuCategoryDto.photo || menuCategory.photo;

    if (store_Id) {
      const store = await this.storeModel.findOne({_id:store_Id}).exec();
      menuCategory.store = store;
    }

    await menuCategory.save();
    return menuCategory
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.menuCategoryModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
