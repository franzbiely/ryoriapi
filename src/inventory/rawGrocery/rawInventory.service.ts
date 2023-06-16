import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawInvGroc } from './rawInventory.entity';
import { CreateRawInvGrocDto } from './dto/create-rawInventory.dto';

@Injectable()
export class RawInvGrocService {
  constructor(
    @InjectRepository(RawInvGroc)
    private rawInvGrocRepository: Repository<RawInvGroc>,
  ) {}

  //Get All User
  findAll(): Promise<RawInvGroc[]> {
    return this.rawInvGrocRepository.find({});
  }

  findOne(id: number): Promise<RawInvGroc> {
    const x = this.rawInvGrocRepository.findOneBy({ id });
    return x;
  }

  async create(_rawInv: CreateRawInvGrocDto): Promise<RawInvGroc> {
    const rawInvGroc = new RawInvGroc();
    rawInvGroc.item = _rawInv.item;
    rawInvGroc.weight = _rawInv.weight;
    rawInvGroc.quantity = _rawInv.quantity;
    return this.rawInvGrocRepository.save(rawInvGroc);
  }

  async update(id: number, rawInvGroc: RawInvGroc) {
    await this.rawInvGrocRepository.update(id, rawInvGroc);
  }

  async remove(id: number): Promise<void> {
    await this.rawInvGrocRepository.delete(id);
  }
}
