import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawGrocery } from './rawInventory.entity';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';
import { UpdateRawGroceryDto } from './dto/update-rawInventory.dto';
import { RawCategory } from '../rawCategory/rawCategory.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Injectable()
export class RawGroceryService {
  constructor(
    @InjectRepository(RawGrocery)
    private rawGroceryRepository: Repository<RawGrocery>,
    @InjectRepository(RawCategory)
    private rawCategoryRepository: Repository<RawCategory>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  //Get All User
  async findAll(branch_Id: number): Promise<any[]> {
    const response = await this.rawGroceryRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'inventoryLogs', 'inventoryLogs.user', 'rawCategory'],
    });
    const newData = response.map((data) => ({
      ...data,
      readyQty: data.inventoryLogs.reduce((prev, cur) => {
        const newQty = cur.type === 'ready' ? cur.quantity : 0;
        return prev + newQty;
      }, 0),
      wasteQty: data.inventoryLogs.reduce((prev, cur) => {
        const newQty = cur.type === 'waste' ? cur.quantity : 0;
        return prev + newQty;
      }, 0),
    }));
    return newData;
  }

  async findOne(id: number): Promise<RawGrocery> {
    const findId = this.rawGroceryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['branch', 'inventoryLogs', 'inventoryLogs.user'],
    });
    return findId;
  }

  async create(_rawInv: CreateRawGroceryDto): Promise<RawGrocery> {
    const rawGroc = new RawGrocery();
    rawGroc.item = _rawInv.item;
    rawGroc.weight = _rawInv.weight;
    rawGroc.quantity = _rawInv.quantity;

    if (_rawInv.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _rawInv.branch_Id },
      });
      rawGroc.branch = branch;
    }
    if (_rawInv.rawCategory_Id) {
      const rawCategory = await this.rawCategoryRepository.findOne({
        where: { id: _rawInv.rawCategory_Id },
      });
      rawGroc.rawCategory = [rawCategory];
    }
    return this.rawGroceryRepository.save(rawGroc);
  }

  async update(
    id: number,
    rawGroceryDto: UpdateRawGroceryDto,
  ): Promise<RawGrocery> {
    const rawGrocery = await this.findOne(id);
    const { item, weight, quantity, rawCategory_Id } = rawGroceryDto;

    rawGrocery.item = item;
    rawGrocery.weight = weight;
    rawGrocery.quantity = quantity;

    if (rawCategory_Id) {
      const rawCategory = await this.rawCategoryRepository.findOne({
        where: { id: rawCategory_Id },
      });
      rawGrocery.rawCategory = [rawCategory];
    }

    return await this.rawGroceryRepository.save(rawGrocery);
  }

  async remove(id: number): Promise<void> {
    await this.rawGroceryRepository.delete(id);
  }
}
