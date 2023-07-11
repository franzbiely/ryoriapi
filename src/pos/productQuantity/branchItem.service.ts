import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchItem } from './branchItem.entity';
import { CreateBranchItemDto } from './dto/create-branchItem.dto';
import { UpdateBranchItemDto } from './dto/update-branchItem.dto';
import { Branch } from 'src/general/branch/branch.entity';
import { MenuItem } from '../product/menuItem/menuItem.entity';

@Injectable()
export class BranchItemService {
  constructor(
    @InjectRepository(BranchItem)
    private quantityRepository: Repository<BranchItem>,

    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  findAll(menuItem_Id: number): Promise<BranchItem[]> {
    return this.quantityRepository.find({
      where: {
        menuItemId: menuItem_Id,
      },
      relations: ['menuItem'],
    });
  }

  async findOne(id: number): Promise<BranchItem> {
    const getOneById = this.quantityRepository.findOne({
      where: {
        id: id,
      },
      relations: ['menuItem', 'branch'],
    });
    return getOneById;
  }

  async create(_quantity: CreateBranchItemDto): Promise<BranchItem> {
    const quantity = new BranchItem();
    quantity.branchItem = _quantity.branchItem;

    if (_quantity.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _quantity.branch_Id },
      });
      quantity.branch = [branch];
    }
    if (_quantity.menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: _quantity.menuItem_Id },
      });
      quantity.menuItem = [menuItem];
    }
    return this.quantityRepository.save(quantity);
  }

  async update(
    id: number,
    updateQuantityDto: UpdateBranchItemDto,
  ): Promise<BranchItem> {
    const quantity = await this.findOne(id);
    const { branchItem, branch_Id, menuItem_Id } = updateQuantityDto;
    quantity.branchItem = branchItem;

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      quantity.branch = [branch];
    }
    if (menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: menuItem_Id },
      });
      quantity.menuItem = [menuItem];
    }

    return await this.quantityRepository.save(quantity);
  }

  async remove(id: number): Promise<void> {
    await this.quantityRepository.delete(id);
  }
}
