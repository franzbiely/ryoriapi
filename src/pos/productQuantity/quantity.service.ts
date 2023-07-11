import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quantity } from './quantity.entity';
import { CreateQuantityDto } from './dto/create-quantity.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { Branch } from 'src/general/branch/branch.entity';

@Injectable()
export class QuantityService {
  constructor(
    @InjectRepository(Quantity)
    private quantityRepository: Repository<Quantity>,

    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  // Get All User
  findAll(branch_Id: number): Promise<Quantity[]> {
    return this.quantityRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch'],
    });
  }

  // findAll(): Promise<Quantity[]> {
  //   return this.quantityRepository.find({});
  // }

  findOne(id: number): Promise<Quantity> {
    const x = this.quantityRepository.findOneBy({ id });
    return x;
  }

  async create(_quantity: CreateQuantityDto): Promise<Quantity> {
    const quantity = new Quantity();
    quantity.qty = _quantity.qty;

    if (_quantity.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _quantity.branch_Id },
      });
      quantity.branch = [branch];
    }
    // if (_rawInv.rawCategory_Id) {
    //   const rawCategory = await this.rawCategoryRepository.findOne({
    //     where: { id: _rawInv.rawCategory_Id },
    //   });
    //   rawGroc.rawCategory = [rawCategory];
    // }
    return this.quantityRepository.save(quantity);
  }

  async update(
    id: number,
    updateQuantityDto: UpdateQuantityDto,
  ): Promise<Quantity> {
    const quantity = await this.findOne(id);
    const { qty, branch_Id } = updateQuantityDto;

    quantity.qty = qty;

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      quantity.branch = [branch];
    }

    return await this.quantityRepository.save(quantity);
  }

  async remove(id: number): Promise<void> {
    await this.quantityRepository.delete(id);
  }
}
