import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { Branch } from '../branch/branch.entity';
import { Users } from '../user/user.entity';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  //Get All food
  findAll(): Promise<Store[]> {
    return this.storeRepository.find({});
  }

  async findOneId(id: number): Promise<Store> {
    const getOneById = this.storeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
    return getOneById;
  }

  async create(_store: CreateStoreDto): Promise<Store> {
    const store = new Store();
    store.storeName = _store.storeName;

    if (_store.user_Id) {
      const user = await this.usersRepository.findOne({
        where: { id: _store.user_Id },
      });
      store.user = user;
    }

    return this.storeRepository.save(store);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const stores = await this.findOneId(id);
    const { storeName, user_Id } = updateStoreDto;
    stores.storeName = storeName;

    if (user_Id) {
      const user = await this.usersRepository.findOne({
        where: { id: user_Id },
      });
      stores.user = user;
    }
    return this.storeRepository.save(stores);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
