import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menuItem.entity';
import { CreateMenuItemDto } from './dto/create-menuItem.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { UpdateMenuItemDto } from './dto/update-menuItem.dto';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
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
    console.log('MenuItem', menuItem);

    return this.menuItemRepository.save(menuItem);
  }

  async update(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.findOne(id);
    const { title, photo, price, quantity, description, cookingTime } =
      updateMenuItemDto;

    menuItem.title = title;
    menuItem.photo = photo;
    menuItem.price = price;
    menuItem.quantity = quantity;
    menuItem.description = description;
    menuItem.cookingTime = cookingTime;

    return this.branchRepository.save(menuItem);
  }

  async remove(id: number): Promise<void> {
    await this.menuItemRepository.delete(id);
  }
}
