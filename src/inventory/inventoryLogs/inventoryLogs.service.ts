import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryLogs } from './inventoryLogs.entity';
import { CreateInventoryLogsDto } from './dto/create-inventoryLogs.dto';
import { UpdateInventoryLogsDto } from './dto/update-inventoryLogs.dto';
import { Users } from 'src/general/user/user.entity';
import { MenuItem } from 'src/pos/product/menuItem/menuItem.entity';
import { Branch } from 'src/general/branch/branch.entity';

@Injectable()
export class InventoryLogsService {
  constructor(
    @InjectRepository(InventoryLogs)
    private invLogsRepository: Repository<InventoryLogs>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  //Get All User
  // findAll(): Promise<InventoryLogs[]> {
  //   return this.invLogsRepository.find({});
  // }

  findAll(branch_Id: number): Promise<InventoryLogs[]> {
    return this.invLogsRepository.find({
      where: {
        branchId: branch_Id,
      },
      relations: ['branch', 'menuItem'],
    });
  }

  findOne(id: number): Promise<InventoryLogs> {
    const getOneById = this.invLogsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['menuItem', 'user'],
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
    if (_inventoryLogs.menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: _inventoryLogs.menuItem_Id },
      });
      logs.menuItem = menuItem;
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

    const { type, qtyReady, user_Id, menuItem_Id } = updateInvLogsDto;
    inventoryLog.type = type;
    inventoryLog.qtyReady = qtyReady;

    if (user_Id) {
      const user = await this.userRepository.findOne({
        where: { id: user_Id },
      });
      inventoryLog.user = user;
    }
    if (menuItem_Id) {
      const menuItem = await this.menuItemRepository.findOne({
        where: { id: menuItem_Id },
      });
      inventoryLog.menuItem = menuItem;
    }
    return this.invLogsRepository.save(inventoryLog);
  }

  async remove(id: number): Promise<void> {
    await this.invLogsRepository.delete(id);
  }
}
