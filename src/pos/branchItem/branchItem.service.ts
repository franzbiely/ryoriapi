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
    @InjectRepository(BranchItem)
    private branchItemRepository: Repository<BranchItem>,
  ) {}

  findAll(branch_Id: number, category_Id: number = -1): Promise<BranchItem[]> {
    const where = (category_Id < 0) ? {
      branchId: branch_Id
    } : {
      branchId: branch_Id,
      menuItem : {
        menuCategory: {
          id: category_Id
        }
      }
    }
    return this.quantityRepository.find({
      where,
      relations: ['branch', 'menuItem', 'menuItem.menuCategory'],
    });
  }

  async findOne(id: number): Promise<BranchItem> {
    const getOneById = this.quantityRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'menuItem'],
    });
    return getOneById;
  }

  async save(dto: CreateBranchItemDto) {
    const branchItem = await this.branchItemRepository.findOne({
      where: {
        branchId: dto.branch_Id,
        menuItemId: dto.menuItem_Id,
      },
    });
    if (branchItem) {
      return await this.update(branchItem.id, dto);
    } else {
      return await this.create(dto);
    }
  }

  async create(_quantity: CreateBranchItemDto): Promise<BranchItem> {
    const qty = new BranchItem();
    qty.quantity = _quantity.quantity;

    if (_quantity.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _quantity.branch_Id },
      });
      qty.branch = branch;
    }
    if (_quantity.menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: _quantity.menuItem_Id },
      });
      qty.menuItem = menuItem;
    }
    return this.quantityRepository.save(qty);
  }

  async update(
    id: number,
    updateQuantityDto: UpdateBranchItemDto,
  ): Promise<BranchItem> {
    const qty = await this.findOne(id);
    const { quantity, branch_Id, menuItem_Id } = updateQuantityDto;
    qty.quantity = quantity;

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      qty.branch = branch;
    }
    if (menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: menuItem_Id },
      });
      qty.menuItem = menuItem;
    }

    return await this.quantityRepository.save(qty);
  }

  async remove(id: number): Promise<void> {
    await this.quantityRepository.delete(id);
  }
}
