import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './menuCategory.entity';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';
import { Store } from 'src/general/store/store.entity';
import { UpdateMenuItemDto } from '../menuItem/dto/update-menuItem.dto';
import { UpdateMenuCategoryDto } from './dto/update-menuCategory.dto';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  //Get All User
  findAll(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find({});
  }

  findOne(id: number): Promise<MenuCategory> {
    const x = this.menuCategoryRepository.findOneBy({ id });
    return x;
  }

  async create(_menuCategory: CreateMenuCategoryDto): Promise<MenuCategory> {
    const menuCategory = new MenuCategory();
    menuCategory.title = _menuCategory.title;
    menuCategory.photo = _menuCategory.photo;

    if (_menuCategory.store_Id) {
      const store = await this.storeRepository.findOne({
        where: { id: _menuCategory.store_Id },
      });
      menuCategory.store = store;
    }

    console.log('menuCategory', menuCategory);
    return this.menuCategoryRepository.save(menuCategory);
  }

  async update(id: number, updateItemDto: UpdateMenuCategoryDto): Promise<MenuCategory> { 
    const item = await this.findOne(id);
    const {
      title,
      photo,
    } = updateItemDto;

    item.title = title;
    item.photo = photo;

    return this.menuCategoryRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.menuCategoryRepository.delete(id);
  }
}
