import { Injectable } from '@nestjs/common';
import { IMenuCategory } from './menuCategory.model';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { IStore } from 'src/general/store/store.model';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';
import { S3Service } from 'src/utils/S3Service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    // @InjectModel('Store')
    // private readonly storeModel: Model<IStore>,
    // private readonly s3Service: Model<S3Service>,
  ) {}

  findAll(store_Id: number): Promise<IMenuCategory[]> {
    return this.menuCategoryModel.find({ storeId: store_Id }).exec();
  }

  findOneId(id: number): Promise<IMenuCategory> {
    return this.menuCategoryModel.findById(id).exec();
  }

  async create(_menuCategory: CreateMenuCategoryDto): Promise<IMenuCategory> {
    const menuCategory = new this.menuCategoryModel({
      title: _menuCategory.title,
      photo: _menuCategory.photo || '',
    });

    // if (_menuCategory.store_Id) {
    //   const store = await this.storeModel.findById(_menuCategory.store_Id).exec();
    //   menuCategory.store = store;
    // }

    return menuCategory.save();
  }

  async update(id: number, menuCategoryDto: UpdateMenuCategoryDto): Promise<IMenuCategory> {
    const menuCategory = await this.menuCategoryModel.findOne({id});

    const { title, photo, store_Id } = menuCategoryDto;
    menuCategory.title = title;
    menuCategory.photo = photo;

    // if (store_Id) {
    //   const store = await this.storeModel.findById(store_Id).exec();
    //   menuCategory.store = store;
    // }

    return menuCategory.save();
  }

  async remove(id: number): Promise<void> {
    await this.menuCategoryModel.findByIdAndDelete(id).exec();
  }
}
