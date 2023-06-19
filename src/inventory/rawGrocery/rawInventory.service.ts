import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawGrocery } from './rawInventory.entity';
import { CreateRawGroceryDto } from './dto/create-rawInventory.dto';

@Injectable()
export class RawGroceryService {
  constructor(
    @InjectRepository(RawGrocery)
    private rawGroceryRepository: Repository<RawGrocery>,
  ) {}

  //Get All User
  findAll(): Promise<RawGrocery[]> {
    return this.rawGroceryRepository.find({});
  }

  findOne(id: number): Promise<RawGrocery> {
    const x = this.rawGroceryRepository.findOneBy({ id });
    return x;
  }

  async create(_rawInv: CreateRawGroceryDto): Promise<RawGrocery> {
    const rawGroc = new RawGrocery();
    rawGroc.item = _rawInv.item;
    rawGroc.weight = _rawInv.weight;
    rawGroc.quantity = _rawInv.quantity;
    return this.rawGroceryRepository.save(rawGroc);
  }

  async update(id: number, rawGrocey: RawGrocery) {
    await this.rawGroceryRepository.update(id, rawGrocey);
  }

  async remove(id: number): Promise<void> {
    await this.rawGroceryRepository.delete(id);
  }
}
