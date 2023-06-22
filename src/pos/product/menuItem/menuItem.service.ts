import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menuItem.entity';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { MenuCategory } from '../menuCategory/menuCategory.entity';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  //Get All User
  findAll(): Promise<MenuItem[]> {
    return this.menuItemRepository.find({});
  }

  findOne(id: number): Promise<MenuItem> {
    const x = this.menuItemRepository.findOneBy({ id });
    return x;
  }

  async create(_menuItem: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = new MenuItem();
    menuItem.title = _menuItem.title;
    menuItem.photo = _menuItem.photo;
    menuItem.price = _menuItem.price;
    menuItem.quantity = _menuItem.quantity;
    menuItem.description = _menuItem.description;
    menuItem.cookingTime = _menuItem.cookingTime;

    if (_menuItem.category_Id) {
      const menuCategory = await this.menuCategoryRepository.findOne({
        where: { id: _menuItem.category_Id },
      });
      menuItem.menuCategory = [menuCategory];
    }

    return this.menuItemRepository.save(menuItem);
  }

  async update(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);
    const { title, photo, price, quantity, description, cookingTime, category_Id } =
      updateMenuItemDto;

    menuItem.title = title;
    menuItem.photo = photo;
    menuItem.price = price;
    menuItem.quantity = quantity;
    menuItem.description = description;
    menuItem.cookingTime = cookingTime;

    if (category_Id) {
      const menuCategory = await this.menuCategoryRepository.findOne({
        where: { id: category_Id },
      });
      menuItem.menuCategory = [menuCategory];
    }

    return this.menuItemRepository.save(menuItem);
  }

  async remove(id: number): Promise<void> {
    await this.menuItemRepository.delete(id);
  }
}
