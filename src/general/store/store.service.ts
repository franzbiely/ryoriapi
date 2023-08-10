import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { Branch } from '../branch/branch.entity';
import { Users } from '../user/user.entity';
import { UpdateStoreDto } from './dto/update-store.dto';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
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

  async findStoreAndBranch(sid: number, bid: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: {
        id: bid,
      },
      relations: ['store', 'store.user'],
    });
    return branch;
  }

  async create(_store: CreateStoreDto): Promise<Store> {
    const store = new Store();
    store.storeName = _store.storeName;
    store.photo = _store.photo || '';

    if (_store.user_Id) {
      const user = await this.usersRepository.findOne({
        where: { id: _store.user_Id },
      });
      store.user = [user];
    }

    return this.storeRepository.save(store);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const stores = await this.findOneId(id);
    const { storeName, photo, user_Id, branch_Id } = updateStoreDto;
    stores.storeName = storeName;
    stores.photo = photo;

    if (user_Id) {
      const user = await this.usersRepository.findOne({
        where: { id: user_Id },
      });
      stores.user = [user];
    }
    console.log({updateStoreDto})
    console.log({stores});

    if (branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: branch_Id },
      });
      branch.branchName = updateStoreDto.branchName
      branch.email = updateStoreDto.email
      branch.contactNumber = updateStoreDto.contactNumber
      branch.address = updateStoreDto.address
      console.log({branch})
      await this.branchRepository.save(branch);
    }


    return await this.storeRepository.save(stores);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
