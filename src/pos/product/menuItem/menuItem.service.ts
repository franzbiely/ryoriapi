import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menuItem.entity';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';
import { MenuCategory } from '../menuCategory/menuCategory.entity';
import { Store } from 'src/general/store/store.entity';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async findAll(store_Id: number): Promise<MenuItem[]> {
    return this.menuItemRepository.find({
      where: {
        storeId: store_Id,
      },
      relations: ['store', 'branchItem'],
    });
  }

  async findAllWithBranchQty(store_Id: number, branch_Id: number) {
    const menuItem = this.menuItemRepository.find({
      where: {
        storeId: store_Id,
      },
      relations: ['store', 'branchItem'],
    });
    const data = await menuItem;
    return data.map((item) => {
      console.log({ branch_Id });
      const newBranch = item.branchItem.filter(
        (subItem) => subItem.branchId == branch_Id,
      );
      console.log({ newBranch });

      return {
        ...item,
        branchItem: null,
        quantity: newBranch[0]?.quantity || 0,
      };
    });
  }

  async findOne(id: number): Promise<MenuItem> {
    const getOneById = this.menuItemRepository.findOne({
      where: {
        id: id,
      },
      relations: ['menuCategory', 'branchItem'],
    });
    return getOneById;
  }

  async create(_menuItem: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = new MenuItem();
    menuItem.title = _menuItem.title;
    menuItem.photo = _menuItem.photo || '';
    menuItem.price = _menuItem.price;
    menuItem.description = _menuItem.description;
    menuItem.cookingTime = _menuItem.cookingTime;

    if (_menuItem.category_Id) {
      const menuCategory = await this.menuCategoryRepository.findOne({
        where: { id: _menuItem.category_Id },
      });
      menuItem.menuCategory = [menuCategory];
    }

    if (_menuItem.store_Id) {
      const store = await this.storeRepository.findOne({
        where: { id: _menuItem.store_Id },
      });
      menuItem.store = store;
    }

    return this.menuItemRepository.save(menuItem);
  }

  async update(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);
    const { title, photo, price, description, cookingTime, category_Id } =
      updateMenuItemDto;

    menuItem.title = title;
    menuItem.photo = photo;
    menuItem.price = price;
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
