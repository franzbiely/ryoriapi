import { Injectable } from '@nestjs/common';
import { IMenuCategory } from './menuCategory.model';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { IStore } from 'src/general/store/store.model';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';
import { S3Service } from 'src/utils/S3Service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectModel('MenuCategory')
    private readonly menuCategoryModel: Model<IMenuCategory>,
    @InjectModel('Store')
    private readonly storeModel: Model<IStore>,
    // private readonly s3Service: Model<S3Service>,
  ) {}

  findAll(store_Id: ObjectId): Promise<IMenuCategory[]> {
    return this.menuCategoryModel.find({ storeId: store_Id }).lean();
  }

  findOneId(id: ObjectId): Promise<IMenuCategory> {
    return this.menuCategoryModel.findOne({_id:id}).lean();
  }

  async create(_menuCategory: CreateMenuCategoryDto): Promise<IMenuCategory> {
    const menuCategory = new this.menuCategoryModel({
      title: _menuCategory.title,
      photo: _menuCategory.photo || '',
    });

    if (_menuCategory.store_Id) {
      const store = await this.storeModel.findOne({_id:_menuCategory.store_Id}).lean();
      menuCategory.store = store._id;
    }

    await menuCategory.save();
    return menuCategory
  }

  async update(id: ObjectId, menuCategoryDto: UpdateMenuCategoryDto): Promise<IMenuCategory> {
    const menuCategory = await this.menuCategoryModel.findOne({_id:id});
    console.log({menuCategory})

    const { title, photo, store_Id } = menuCategoryDto;
    menuCategory.title = title;
    menuCategory.photo = photo;

    if (store_Id) {
      const store = await this.storeModel.findOne({_id:store_Id}).exec();
      menuCategory.store = store._id;
    }

    await menuCategory.save();
    return menuCategory
  }

  async remove(id: ObjectId): Promise<string | void> {
    const result = await this.menuCategoryModel.deleteOne({ _id : id }).exec();
    return `Deleted ${result.deletedCount} record`;
  }
}
