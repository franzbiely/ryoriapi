import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './menuCategory.entity';
import { CreateMenuCategoryDto } from './dto/create-menuCategory.dto';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
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

    console.log('menuCategory', menuCategory);
    return this.menuCategoryRepository.save(menuCategory);
  }

  async update(id: number, menuCategory: MenuCategory) {
    await this.menuCategoryRepository.update(id, menuCategory);
  }

  async remove(id: number): Promise<void> {
    await this.menuCategoryRepository.delete(id);
  }
}
