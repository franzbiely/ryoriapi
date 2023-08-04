import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryLogs } from './inventoryLogs.entity';
import { CreateInventoryLogsDto } from './dto/create-inventoryLogs.dto';
import { UpdateInventoryLogsDto } from './dto/update-inventoryLogs.dto';
import { Users } from 'src/general/user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Branch } from 'src/general/branch/branch.entity';
import { RawGrocery } from '../rawGrocery/rawInventory.entity';

@Injectable()
export class InventoryLogsService {
  constructor(
    @InjectRepository(InventoryLogs)
    private invLogsRepository: Repository<InventoryLogs>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(RawGrocery)
    private rawGroceryRepository: Repository<RawGrocery>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  findAll(branch_Id: number): Promise<InventoryLogs[]> {
    return this.invLogsRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'rawGrocery'],
    });
  }

  findOne(id: number): Promise<InventoryLogs> {
    const getOneById = this.invLogsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['rawGrocery', 'user'],
    });
    return getOneById;
  }

  async create(_inventoryLogs: CreateInventoryLogsDto): Promise<InventoryLogs> {
    const logs = new InventoryLogs();
    logs.type = _inventoryLogs.type;
    logs.qtyReady = _inventoryLogs.qtyReady;

    if (_inventoryLogs.user_Id) {
      const user = await this.userRepository.findOne({
        where: { id: _inventoryLogs.user_Id },
      });
      logs.user = user;
    }
    if (_inventoryLogs.rawGrocery_Id) {
      const rawGrocery = await this.rawGroceryRepository.findOne({
        where: { id: _inventoryLogs.rawGrocery_Id },
      });
      logs.rawGrocery = rawGrocery;
    }
    if (_inventoryLogs.branch_Id) {
      const branch = await this.branchRepository.findOne({
        where: { id: _inventoryLogs.branch_Id },
      });
      logs.branch = branch;
    }
    return this.invLogsRepository.save(logs);
  }

  async update(
    id: number,
    updateInvLogsDto: UpdateInventoryLogsDto,
  ): Promise<InventoryLogs> {
    const inventoryLog = await this.findOne(id);

    const { type, qtyReady, user_Id } = updateInvLogsDto;
    inventoryLog.type = type;
    inventoryLog.qtyReady = qtyReady;

    if (user_Id) {
      const user = await this.userRepository.findOne({
        where: { id: user_Id },
      });
      inventoryLog.user = user;
    }
    return this.invLogsRepository.save(inventoryLog);
  }

  async remove(id: number): Promise<void> {
    await this.invLogsRepository.delete(id);
  }
}
